#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IamUser } from '../src/iam-user';

const iniciativa :string = 'GitHubUser';
const provider = {
  account: process.env.CDK_DEFAULT_ACCOUNT, 
  region: process.env.CDK_DEFAULT_REGION 
};

const app = new cdk.App();

new IamUser(app, iniciativa, {
  env: provider
})


app.synth();
