import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';
 
const s3 = new S3Client({}); 
const bucketName = process.env.BUCKET_NAME!; 
const minutesOld = parseInt(process.env.MINUTES_OLD || '3');
 
exports.handler = async () => { const now = Date.now(); 
    const threshold = now - minutesOld * 3 * 1000;

    const listedObjects = await s3.send(
        new ListObjectsV2Command({ Bucket: bucketName })
      );
    
      const oldFiles = (listedObjects.Contents || []).filter(obj =>
        obj.LastModified && obj.LastModified.getTime() < threshold
      );
    
      if (oldFiles.length === 0) {
        console.log('No old files to delete.');
        return;
      }
    
      const deleteParams = {
        Bucket: bucketName,
        Delete: {
          Objects: oldFiles.map(file => ({ Key: file.Key! }))
        }
      };
    
      await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log(`Deleted ${oldFiles.length} files from ${bucketName}`);
    };
 

