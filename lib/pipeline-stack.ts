import { Stack, StackProps, Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { BucketCleanupThroughCdkStack } from './bucket-cleanup-through-cdk-stack';
import * as cdk from 'aws-cdk-lib';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
        pipelineName: 'S3CleanupPipeline',
        synth: new ShellStep('SynthStep', {
          input: CodePipelineSource.gitHub('Samiksha022628/bucket-cleanup-through-cdk', 'main', // replace 'Samiksha022628' with your github username and 'bucket-cleanup-through-cdk' with your github repo
            { 
            authentication: cdk.SecretValue.secretsManager('GITHUB_TOKEN'), // replace the 'GITHUB_TOKEN' with your aws secret name used to store the github token
          }),
          commands: [
            'npm ci',
            'npm install -g aws-cdk',
            'cdk synth',
          ],
        }),
      });

      const appStage = new S3CleanupStage(this, 'AppStage', {
        env: {
          account: process.env.CDK_DEFAULT_ACCOUNT,
          region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
        },
      });
  
      pipeline.addStage(appStage);
    }
  }
  
  class S3CleanupStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
      super(scope, id, props);
  
      new BucketCleanupThroughCdkStack(this, 'BucketCleanupThroughCdkStack');
    }
  }
