"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BucketCleanupThroughCdkStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const events = require("aws-cdk-lib/aws-events");
const targets = require("aws-cdk-lib/aws-events-targets");
const bucket_config_1 = require("../bucket-config"); // Make sure this exists and works
class BucketCleanupThroughCdkStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const buckets = (0, bucket_config_1.getBuckets)(this);
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
                schedule: events.Schedule.rate(aws_cdk_lib_1.Duration.minutes(3)),
                targets: [new targets.LambdaFunction(cleanupFunction)],
            });
        }
    }
}
exports.BucketCleanupThroughCdkStack = BucketCleanupThroughCdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVja2V0LWNsZWFudXAtdGhyb3VnaC1jZGstc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidWNrZXQtY2xlYW51cC10aHJvdWdoLWNkay1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBMEQ7QUFDMUQsaURBQWlEO0FBQ2pELGlEQUFpRDtBQUNqRCwwREFBMEQ7QUFDMUQsb0RBQThDLENBQUMsa0NBQWtDO0FBRWpGLE1BQWEsNEJBQTZCLFNBQVEsbUJBQUs7SUFDckQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLE9BQU8sR0FBRyxJQUFBLDBCQUFVLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFakMsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUM3QixNQUFNLGVBQWUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLHFCQUFxQixNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQzFGLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7Z0JBQ25DLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSw2QkFBNkI7Z0JBQ3BFLFdBQVcsRUFBRTtvQkFDWCxXQUFXLEVBQUUsTUFBTSxDQUFDLFVBQVU7b0JBQzlCLFdBQVcsRUFBRSxHQUFHO2lCQUNqQjthQUNGLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFdkMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxtQkFBbUIsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUM1RCxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsc0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUN2RCxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBekJELG9FQXlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMsIER1cmF0aW9uIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgZXZlbnRzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1ldmVudHMnO1xuaW1wb3J0ICogYXMgdGFyZ2V0cyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZXZlbnRzLXRhcmdldHMnO1xuaW1wb3J0IHsgZ2V0QnVja2V0cyB9IGZyb20gJy4uL2J1Y2tldC1jb25maWcnOyAvLyBNYWtlIHN1cmUgdGhpcyBleGlzdHMgYW5kIHdvcmtzXG5cbmV4cG9ydCBjbGFzcyBCdWNrZXRDbGVhbnVwVGhyb3VnaENka1N0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGJ1Y2tldHMgPSBnZXRCdWNrZXRzKHRoaXMpO1xuXG4gICAgZm9yIChjb25zdCBidWNrZXQgb2YgYnVja2V0cykge1xuICAgICAgY29uc3QgY2xlYW51cEZ1bmN0aW9uID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBgUzNDbGVhbnVwRnVuY3Rpb24tJHtidWNrZXQuYnVja2V0TmFtZX1gLCB7XG4gICAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xOF9YLFxuICAgICAgICBoYW5kbGVyOiAnY2xlYW51cC5oYW5kbGVyJyxcbiAgICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSwgLy8gWW91ciBMYW1iZGEgY29kZSBkaXJlY3RvcnlcbiAgICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICBCVUNLRVRfTkFNRTogYnVja2V0LmJ1Y2tldE5hbWUsXG4gICAgICAgICAgTUlOVVRFU19PTEQ6ICczJyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBidWNrZXQuZ3JhbnRSZWFkV3JpdGUoY2xlYW51cEZ1bmN0aW9uKTtcblxuICAgICAgbmV3IGV2ZW50cy5SdWxlKHRoaXMsIGBDbGVhbnVwU2NoZWR1bGUtJHtidWNrZXQuYnVja2V0TmFtZX1gLCB7XG4gICAgICAgIHNjaGVkdWxlOiBldmVudHMuU2NoZWR1bGUucmF0ZShEdXJhdGlvbi5taW51dGVzKDMpKSxcbiAgICAgICAgdGFyZ2V0czogW25ldyB0YXJnZXRzLkxhbWJkYUZ1bmN0aW9uKGNsZWFudXBGdW5jdGlvbildLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=