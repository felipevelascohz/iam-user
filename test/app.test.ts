import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IamUser } from '../src/iam-user';
 
test('SQS Created', () => {
  const app = new cdk.App();
  const stack = new IamUser(app, 'test')

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::IAM::User', {
    "UserName": "GitHubUserLambda"
  });
});