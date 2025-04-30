import { Construct } from 'constructs';
import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import { getBuckets } from '../bucket-config'; // Make sure this exists and works

export class BucketCleanupThroughCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const buckets = getBuckets(this);

    for (const bucket of buckets) {
      const cleanupFunction = new lambda.Function(this, `S3CleanupFunction-${bucket.bucketName}`, {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: 'cleanup.handler',
        code: lambda.Code.fromAsset('lambda'), // Your Lambda code directory
        environment: {
          BUCKET_NAME: bucket.bucketName,
          MINUTES_OLD: '3',
        },
      });

      bucket.grantReadWrite(cleanupFunction);

      new events.Rule(this, `CleanupSchedule-${bucket.bucketName}`, {
        schedule: events.Schedule.rate(Duration.minutes(3)),
        targets: [new targets.LambdaFunction(cleanupFunction)],
      });
    }
  }
}
