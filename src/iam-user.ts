import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';

export class IamUser extends cdk.Stack {
    constructor(stack:Construct, id:string, props?: cdk.StackProps) {
        super(stack, id, props);
        const lambdaUser = new iam.User(this, 'GitHubUserLambda', {
            userName: 'GitHubUserLambda'
        });
        lambdaUser.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSQSReadOnlyAccess'));
        lambdaUser.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonVPCReadOnlyAccess'));
        lambdaUser.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCodeDeployDeployerAccess'));
        lambdaUser.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_FullAccess'));
        lambdaUser.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSStepFunctionsFullAccess'));
        lambdaUser.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonAPIGatewayAdministrator'));
        const cloudFormationLambdaPolicy = new iam.Policy(this, 'CloudFormationLambdaPolicy', {
            statements: [new iam.PolicyStatement({
                actions: [
                    "cloudformation:ListResources",
                    "cloudformation:GetResource",
                    "cloudformation:UpdateResource",
                    "cloudformation:CreateResource",
                    "cloudformation:DescribeStacks",
                    "cloudformation:ListStackResources",
                    "cloudformation:ListStacks",
                    "cloudformation:DescribeStackResource",
                    "cloudformation:ValidateTemplate",
                    "cloudformation:DeleteChangeSet",
                    "cloudformation:CreateChangeSet",
                    "cloudformation:DescribeChangeSet",
                    "cloudformation:ExecuteChangeSet",
                    "cloudformation:DescribeStackEvents",
                    "cloudformation:GetTemplateSummary" 
                ],
                resources: ['*']
            })]
        });
        const cloudWatchLambdaPolicy = new iam.Policy(this, 'CloudWatchLambdaPolicy', {
            statements: [new iam.PolicyStatement({
                actions: [
                    "cloudwatch:*"
                ],
                resources: ['*']
            })]
        });
        const iamLambdaPolicy = new iam.Policy(this, 'IamLambdaPolicy', {
            statements: [new iam.PolicyStatement({
                actions: [
                    "iam:CreateRole",
                    "iam:PutRolePolicy",
                    "iam:CreateInstanceProfile",
                    "iam:AddRoleToInstanceProfile",
                    "iam:ListRoles",
                    "iam:GetPolicy",
                    "iam:GetInstanceProfile",
                    "iam:GetPolicyVersion",
                    "iam:AttachRolePolicy",
                    "iam:PassRole",
                    "iam:GetRole",
                    "kms:Encrypt",
                    "kms:Decrypt",
                    "kms:ReEncrypt*",
                    "kms:GenerateDataKey*",
                    "kms:DescribeKey",
                    "kms:CreateGrant"
                ],
                resources: ['*']
            })]
        });
        const s3LambdaPolicy = new iam.Policy(this, 'S3LambdaPolicy', {
            statements: [new iam.PolicyStatement({
                actions: [
                    "s3:ReplicateTags",
                    "s3:PutStorageLensConfiguration",
                    "s3:RestoreObject",
                    "s3:CreateBucket",
                    "s3:ListBucket",
                    "s3:PutEncryptionConfiguration",
                    "s3:DeleteJobTagging",
                    "s3:PutBucketTagging",
                    "s3:PutLifecycleConfiguration",
                    "s3:PutBucketAcl",
                    "s3:PutObjectTagging",
                    "s3:PutObjectAcl",
                    "s3:DeleteObjectTagging",
                    "s3:PutBucketPublicAccessBlock",
                    "s3:PutAccountPublicAccessBlock",
                    "s3:DeleteStorageLensConfigurationTagging",
                    "s3:PutStorageLensConfigurationTagging",
                    "s3:PutObjectVersionTagging",
                    "s3:PutJobTagging",
                    "s3:PutObjectLegalHold",
                    "s3:UpdateJobStatus",
                    "s3:DeleteObjectVersionTagging",
                    "s3:PutObject",
                    "s3:ListAllMyBuckets",
                    "s3:PutBucketLogging",
                    "s3:PutObjectVersionAcl",
                    "s3:PutAccessPointPublicAccessBlock",
                    "s3:PutBucketPolicy",
                    "s3:GetObject*"
                ],
                resources: ['*']
            })]
        });
        lambdaUser.attachInlinePolicy(cloudFormationLambdaPolicy);
        lambdaUser.attachInlinePolicy(cloudWatchLambdaPolicy);
        lambdaUser.attachInlinePolicy(iamLambdaPolicy);
        lambdaUser.attachInlinePolicy(s3LambdaPolicy);
        const accessKey = new iam.AccessKey(this, 'lambdaUserAcessKey', {user: lambdaUser});
        new cdk.CfnOutput(this, 'Id', {
            value: accessKey.accessKeyId
        });
        
        new cdk.CfnOutput(this, 'Secret', {
            value: accessKey.secretAccessKey.unsafeUnwrap()
        });
    };
};