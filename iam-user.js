"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamUser = void 0;
const iam = require("aws-cdk-lib/aws-iam");
const cdk = require("aws-cdk-lib");
const secretsmanager = require("aws-cdk-lib/aws-secretsmanager");
class IamUser extends cdk.Stack {
    constructor(stack, id, props) {
        super(stack, id, props);
        const lambdaUser = new iam.User(this, 'GitHubUserLambda', {
            userName: 'GitHubUserLambda'
        });
        lambdaUser.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSQSReadOnlyAccess'));
        lambdaUser.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonVPCReadOnlyAccess'));
        lambdaUser.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCodeDeployDeployerAccess'));
        lambdaUser.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_FullAccess'));
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
        const accessKey = new iam.AccessKey(this, 'lambdaUserAcessKey', { user: lambdaUser });
        new secretsmanager.Secret(this, 's', {
            secretStringValue: accessKey.secretAccessKey,
        });
        new cdk.CfnOutput(this, 'Id', {
            value: accessKey.accessKeyId
        });
        /*new cdk.CfnOutput(this, 'Secret', {
            value: accessKey.secretAccessKey.unsafeUnwrap()
        })*/
    }
    ;
}
exports.IamUser = IamUser;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWFtLXVzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvaWFtLXVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMkNBQTJDO0FBQzNDLG1DQUFtQztBQUNuQyxpRUFBaUU7QUFDakUsTUFBYSxPQUFRLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDbEMsWUFBWSxLQUFlLEVBQUUsRUFBUyxFQUFFLEtBQXNCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDdEQsUUFBUSxFQUFFLGtCQUFrQjtTQUMvQixDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7UUFDbkcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO1FBQ25HLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQztRQUN2RyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7UUFDaEcsTUFBTSwwQkFBMEIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLDRCQUE0QixFQUFFO1lBQ2xGLFVBQVUsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQztvQkFDakMsT0FBTyxFQUFFO3dCQUNMLDhCQUE4Qjt3QkFDOUIsNEJBQTRCO3dCQUM1QiwrQkFBK0I7d0JBQy9CLCtCQUErQjt3QkFDL0IsK0JB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ZUFBZTtTQUMvQyxDQUFDLENBQUM7UUFDSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtZQUMxQixLQUFLLEVBQUUsU0FBUyxDQUFDLFdBQVc7U0FDL0IsQ0FBQyxDQUFDO1FBRUg7O1lBRUk7SUFDUixDQUFDO0lBQUEsQ0FBQztDQUNMO0FBcEhELDBCQW9IQztBQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBzZWNyZXRzbWFuYWdlciBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc2VjcmV0c21hbmFnZXInO1xuZXhwb3J0IGNsYXNzIElhbVVzZXIgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICAgIGNvbnN0cnVjdG9yKHN0YWNrOkNvbnN0cnVjdCwgaWQ6c3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgICAgIHN1cGVyKHN0YWNrLCBpZCwgcHJvcHMpO1xuICAgICAgICBjb25zdCBsYW1iZGFVc2VyID0gbmV3IGlhbS5Vc2VyKHRoaXMsICdHaXRIdWJVc2VyTGFtYmRhJywge1xuICAgICAgICAgICAgdXNlck5hbWU6ICdHaXRIdWJVc2VyTGFtYmRhJ1xuICAgICAgICB9KTtcbiAgICAgICAgbGFtYmRhVXNlci5hZGRNYW5hZ2VkUG9saWN5KGlhbS5NYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZSgnQW1hem9uU1FTUmVhZE9ubHlBY2Nlc3MnKSk7XG4gICAgICAgIGxhbWJkYVVzZXIuYWRkTWFuYWdlZFBvbGljeShpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FtYXpvblZQQ1JlYWRPbmx5QWNjZXNzJykpO1xuICAgICAgICBsYW1iZGFVc2VyLmFkZE1hbmFnZWRQb2xpY3koaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBV1NDb2RlRGVwbG95RGVwbG95ZXJBY2Nlc3MnKSk7XG4gICAgICAgIGxhbWJkYVVzZXIuYWRkTWFuYWdlZFBvbGljeShpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FXU0xhbWJkYV9GdWxsQWNjZXNzJykpO1xuICAgICAgICBjb25zdCBjbG91ZEZvcm1hdGlvbkxhbWJkYVBvbGljeSA9IG5ldyBpYW0uUG9saWN5KHRoaXMsICdDbG91ZEZvcm1hdGlvbkxhbWJkYVBvbGljeScsIHtcbiAgICAgICAgICAgIHN0YXRlbWVudHM6IFtuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgICAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICBcImNsb3VkZm9ybWF0aW9uOkxpc3RSZXNvdXJjZXNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpHZXRSZXNvdXJjZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImNsb3VkZm9ybWF0aW9uOlVwZGF0ZVJlc291cmNlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246Q3JlYXRlUmVzb3VyY2VcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpEZXNjcmliZVN0YWNrc1wiLFxuICAgICAgICAgICAgICAgICAgICBcImNsb3VkZm9ybWF0aW9uOkxpc3RTdGFja1Jlc291cmNlc1wiLFxuICAgICAgICAgICAgICAgICAgICBcImNsb3VkZm9ybWF0aW9uOkxpc3RTdGFja3NcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpEZXNjcmliZVN0YWNrUmVzb3VyY2VcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpWYWxpZGF0ZVRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246RGVsZXRlQ2hhbmdlU2V0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246Q3JlYXRlQ2hhbmdlU2V0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246RGVzY3JpYmVDaGFuZ2VTZXRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpFeGVjdXRlQ2hhbmdlU2V0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246RGVzY3JpYmVTdGFja0V2ZW50c1wiLFxuICAgICAgICAgICAgICAgICAgICBcImNsb3VkZm9ybWF0aW9uOkdldFRlbXBsYXRlU3VtbWFyeVwiIFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzOiBbJyonXVxuICAgICAgICAgICAgfSldXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBjbG91ZFdhdGNoTGFtYmRhUG9saWN5ID0gbmV3IGlhbS5Qb2xpY3kodGhpcywgJ0Nsb3VkV2F0Y2hMYW1iZGFQb2xpY3knLCB7XG4gICAgICAgICAgICBzdGF0ZW1lbnRzOiBbbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICAgICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJjbG91ZHdhdGNoOipcIlxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzOiBbJyonXVxuICAgICAgICAgICAgfSldXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBpYW1MYW1iZGFQb2xpY3kgPSBuZXcgaWFtLlBvbGljeSh0aGlzLCAnSWFtTGFtYmRhUG9saWN5Jywge1xuICAgICAgICAgICAgc3RhdGVtZW50czogW25ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiaWFtOkNyZWF0ZVJvbGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpYW06UHV0Um9sZVBvbGljeVwiLFxuICAgICAgICAgICAgICAgICAgICBcImlhbTpDcmVhdGVJbnN0YW5jZVByb2ZpbGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpYW06QWRkUm9sZVRvSW5zdGFuY2VQcm9maWxlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaWFtOkxpc3RSb2xlc1wiLFxuICAgICAgICAgICAgICAgICAgICBcImlhbTpHZXRQb2xpY3lcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpYW06R2V0SW5zdGFuY2VQcm9maWxlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaWFtOkdldFBvbGljeVZlcnNpb25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJpYW06QXR0YWNoUm9sZVBvbGljeVwiLFxuICAgICAgICAgICAgICAgICAgICBcImlhbTpQYXNzUm9sZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImlhbTpHZXRSb2xlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwia21zOkVuY3J5cHRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJrbXM6RGVjcnlwdFwiLFxuICAgICAgICAgICAgICAgICAgICBcImttczpSZUVuY3J5cHQqXCIsXG4gICAgICAgICAgICAgICAgICAgIFwia21zOkdlbmVyYXRlRGF0YUtleSpcIixcbiAgICAgICAgICAgICAgICAgICAgXCJrbXM6RGVzY3JpYmVLZXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJrbXM6Q3JlYXRlR3JhbnRcIlxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzOiBbJyonXVxuICAgICAgICAgICAgfSldXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzM0xhbWJkYVBvbGljeSA9IG5ldyBpYW0uUG9saWN5KHRoaXMsICdTM0xhbWJkYVBvbGljeScsIHtcbiAgICAgICAgICAgIHN0YXRlbWVudHM6IFtuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgICAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICBcInMzOlJlcGxpY2F0ZVRhZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzMzpQdXRTdG9yYWdlTGVuc0NvbmZpZ3VyYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJzMzpSZXN0b3JlT2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiczM6Q3JlYXRlQnVja2V0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiczM6TGlzdEJ1Y2tldFwiLFxuICAgICAgICAgICAgICAgICAgICBcInMzOlB1dEVuY3J5cHRpb25Db25maWd1cmF0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiczM6RGVsZXRlSm9iVGFnZ2luZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInMzOlB1dEJ1Y2tldFRhZ2dpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzMzpQdXRMaWZlY3ljbGVDb25maWd1cmF0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiczM6UHV0QnVja2V0QWNsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiczM6UHV0T2JqZWN0VGFnZ2luZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInMzOlB1dE9iamVjdEFjbFwiLFxuICAgICAgICAgICAgICAgICAgICBcInMzOkRlbGV0ZU9iamVjdFRhZ2dpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzMzpQdXRCdWNrZXRQdWJsaWNBY2Nlc3NCbG9ja1wiLFxuICAgICAgICAgICAgICAgICAgICBcInMzOlB1dEFjY291bnRQdWJsaWNBY2Nlc3NCbG9ja1wiLFxuICAgICAgICAgICAgICAgICAgICBcInMzOkRlbGV0ZVN0b3JhZ2VMZW5zQ29uZmlndXJhdGlvblRhZ2dpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzMzpQdXRTdG9yYWdlTGVuc0NvbmZpZ3VyYXRpb25UYWdnaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiczM6UHV0T2JqZWN0VmVyc2lvblRhZ2dpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzMzpQdXRKb2JUYWdnaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiczM6UHV0T2JqZWN0TGVnYWxIb2xkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiczM6VXBkYXRlSm9iU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiczM6RGVsZXRlT2JqZWN0VmVyc2lvblRhZ2dpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzMzpQdXRPYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzMzpMaXN0QWxsTXlCdWNrZXRzXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiczM6UHV0QnVja2V0TG9nZ2luZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInMzOlB1dE9iamVjdFZlcnNpb25BY2xcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzMzpQdXRBY2Nlc3NQb2ludFB1YmxpY0FjY2Vzc0Jsb2NrXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiczM6UHV0QnVja2V0UG9saWN5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiczM6R2V0T2JqZWN0KlwiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXM6IFsnKiddXG4gICAgICAgICAgICB9KV1cbiAgICAgICAgfSk7XG4gICAgICAgIGxhbWJkYVVzZXIuYXR0YWNoSW5saW5lUG9saWN5KGNsb3VkRm9ybWF0aW9uTGFtYmRhUG9saWN5KTtcbiAgICAgICAgbGFtYmRhVXNlci5hdHRhY2hJbmxpbmVQb2xpY3koY2xvdWRXYXRjaExhbWJkYVBvbGljeSk7XG4gICAgICAgIGxhbWJkYVVzZXIuYXR0YWNoSW5saW5lUG9saWN5KGlhbUxhbWJkYVBvbGljeSk7XG4gICAgICAgIGxhbWJkYVVzZXIuYXR0YWNoSW5saW5lUG9saWN5KHMzTGFtYmRhUG9saWN5KTtcbiAgICAgICAgY29uc3QgYWNjZXNzS2V5ID0gbmV3IGlhbS5BY2Nlc3NLZXkodGhpcywgJ2xhbWJkYVVzZXJBY2Vzc0tleScsIHt1c2VyOiBsYW1iZGFVc2VyfSk7XG4gICAgICAgIG5ldyBzZWNyZXRzbWFuYWdlci5TZWNyZXQodGhpcywgJ3MnLCB7XG4gICAgICAgICAgICBzZWNyZXRTdHJpbmdWYWx1ZTogYWNjZXNzS2V5LnNlY3JldEFjY2Vzc0tleSxcbiAgICAgICAgfSk7XG4gICAgICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdJZCcsIHtcbiAgICAgICAgICAgIHZhbHVlOiBhY2Nlc3NLZXkuYWNjZXNzS2V5SWRcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvKm5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdTZWNyZXQnLCB7XG4gICAgICAgICAgICB2YWx1ZTogYWNjZXNzS2V5LnNlY3JldEFjY2Vzc0tleS51bnNhZmVVbndyYXAoKVxuICAgICAgICB9KSovXG4gICAgfTtcbn07Il19