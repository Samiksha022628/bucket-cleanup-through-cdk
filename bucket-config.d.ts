import * as s3 from 'aws-cdk-lib/aws-s3';
import { Stack } from 'aws-cdk-lib';
export declare function getBuckets(stack: Stack): s3.IBucket[];
