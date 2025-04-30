import * as s3 from 'aws-cdk-lib/aws-s3';
import { Stack } from 'aws-cdk-lib';

export function getBuckets(stack: Stack): s3.IBucket[] {
  const bucketNames = ['demo-abc', 'demo-def']; // replace the 'demo-abc' and 'demo-def' with the names of the bucket created.
  
  return bucketNames.map((name, index) => 
    s3.Bucket.fromBucketName(stack, `ImportedBucket${index}`, name)
  );
}

