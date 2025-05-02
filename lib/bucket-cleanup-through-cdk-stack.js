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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVja2V0LWNsZWFudXAtdGhyb3VnaC1jZGstc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidWNrZXQtY2xlYW51cC10aHJvdWdoLWNkay1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBMEQ7QUFDMUQsaURBQWlEO0FBQ2pELGlEQUFpRDtBQUNqRCwwREFBMEQ7QUFDMUQsb0RBQThDLENBQUMsa0NBQWtDO0FBRWpGLE1BQWEsNEJBQTZCLFNBQVEsbUJBQUs7SUFDckQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLE9BQU8sR0FBRyxJQUFBLDBCQUFVLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFakMsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUM3QixNQUFNLGVBQWUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLHFCQUFxQixNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQzFGLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7Z0JBQ25DLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSw2QkFBNkI7Z0JBQ3BFLFdBQVcsRUFBRTtvQkFDWCxXQUFXLEVBQUUsTUFBTSxDQUFDLFVBQVU7b0JBQzlCLFdBQVcsRUFBRSxHQUFHO2lCQUNqQjthQUNGLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFdkMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxtQkFBbUIsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUM1RCxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsc0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUN2RCxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBekJELG9FQXlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xyXG5pbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcywgRHVyYXRpb24gfSBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcclxuaW1wb3J0ICogYXMgZXZlbnRzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1ldmVudHMnO1xyXG5pbXBvcnQgKiBhcyB0YXJnZXRzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1ldmVudHMtdGFyZ2V0cyc7XHJcbmltcG9ydCB7IGdldEJ1Y2tldHMgfSBmcm9tICcuLi9idWNrZXQtY29uZmlnJzsgLy8gTWFrZSBzdXJlIHRoaXMgZXhpc3RzIGFuZCB3b3Jrc1xyXG5cclxuZXhwb3J0IGNsYXNzIEJ1Y2tldENsZWFudXBUaHJvdWdoQ2RrU3RhY2sgZXh0ZW5kcyBTdGFjayB7XHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICBjb25zdCBidWNrZXRzID0gZ2V0QnVja2V0cyh0aGlzKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGJ1Y2tldCBvZiBidWNrZXRzKSB7XHJcbiAgICAgIGNvbnN0IGNsZWFudXBGdW5jdGlvbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgYFMzQ2xlYW51cEZ1bmN0aW9uLSR7YnVja2V0LmJ1Y2tldE5hbWV9YCwge1xyXG4gICAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xOF9YLFxyXG4gICAgICAgIGhhbmRsZXI6ICdjbGVhbnVwLmhhbmRsZXInLFxyXG4gICAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksIC8vIFlvdXIgTGFtYmRhIGNvZGUgZGlyZWN0b3J5XHJcbiAgICAgICAgZW52aXJvbm1lbnQ6IHtcclxuICAgICAgICAgIEJVQ0tFVF9OQU1FOiBidWNrZXQuYnVja2V0TmFtZSxcclxuICAgICAgICAgIE1JTlVURVNfT0xEOiAnMycsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBidWNrZXQuZ3JhbnRSZWFkV3JpdGUoY2xlYW51cEZ1bmN0aW9uKTtcclxuXHJcbiAgICAgIG5ldyBldmVudHMuUnVsZSh0aGlzLCBgQ2xlYW51cFNjaGVkdWxlLSR7YnVja2V0LmJ1Y2tldE5hbWV9YCwge1xyXG4gICAgICAgIHNjaGVkdWxlOiBldmVudHMuU2NoZWR1bGUucmF0ZShEdXJhdGlvbi5taW51dGVzKDMpKSxcclxuICAgICAgICB0YXJnZXRzOiBbbmV3IHRhcmdldHMuTGFtYmRhRnVuY3Rpb24oY2xlYW51cEZ1bmN0aW9uKV0sXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=