"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const pipelines_1 = require("aws-cdk-lib/pipelines");
const bucket_cleanup_through_cdk_stack_1 = require("./bucket-cleanup-through-cdk-stack");
const cdk = require("aws-cdk-lib");
class PipelineStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const pipeline = new pipelines_1.CodePipeline(this, 'Pipeline', {
            pipelineName: 'S3CleanupPipeline',
            synth: new pipelines_1.ShellStep('SynthStep', {
                input: pipelines_1.CodePipelineSource.gitHub('Samiksha022628/bucket-cleanup-through-cdk', 'main', {
                    authentication: cdk.SecretValue.secretsManager('GITHUB_TOKEN'),
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
exports.PipelineStack = PipelineStack;
class S3CleanupStage extends aws_cdk_lib_1.Stage {
    constructor(scope, id, props) {
        super(scope, id, props);
        new bucket_cleanup_through_cdk_stack_1.BucketCleanupThroughCdkStack(this, 'BucketCleanupThroughCdkStack');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBbUU7QUFFbkUscURBQW9GO0FBQ3BGLHlGQUFrRjtBQUNsRixtQ0FBbUM7QUFFbkMsTUFBYSxhQUFjLFNBQVEsbUJBQUs7SUFDdEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLFFBQVEsR0FBRyxJQUFJLHdCQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNoRCxZQUFZLEVBQUUsbUJBQW1CO1lBQ2pDLEtBQUssRUFBRSxJQUFJLHFCQUFTLENBQUMsV0FBVyxFQUFFO2dCQUNoQyxLQUFLLEVBQUUsOEJBQWtCLENBQUMsTUFBTSxDQUFDLDJDQUEyQyxFQUFFLE1BQU0sRUFBRTtvQkFDcEYsY0FBYyxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQztpQkFDL0QsQ0FBQztnQkFDRixRQUFRLEVBQUU7b0JBQ1IsUUFBUTtvQkFDUix3QkFBd0I7b0JBQ3hCLFdBQVc7aUJBQ1o7YUFDRixDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNwRCxHQUFHLEVBQUU7Z0JBQ0gsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CO2dCQUN4QyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsSUFBSSxXQUFXO2FBQ3REO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7QUEzQkgsc0NBMkJHO0FBRUQsTUFBTSxjQUFlLFNBQVEsbUJBQUs7SUFDaEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixJQUFJLCtEQUE0QixDQUFDLElBQUksRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzLCBTdGFnZSwgU3RhZ2VQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcbmltcG9ydCB7IENvZGVQaXBlbGluZSwgQ29kZVBpcGVsaW5lU291cmNlLCBTaGVsbFN0ZXAgfSBmcm9tICdhd3MtY2RrLWxpYi9waXBlbGluZXMnO1xyXG5pbXBvcnQgeyBCdWNrZXRDbGVhbnVwVGhyb3VnaENka1N0YWNrIH0gZnJvbSAnLi9idWNrZXQtY2xlYW51cC10aHJvdWdoLWNkay1zdGFjayc7XHJcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XHJcblxyXG5leHBvcnQgY2xhc3MgUGlwZWxpbmVTdGFjayBleHRlbmRzIFN0YWNrIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG5cclxuICAgIGNvbnN0IHBpcGVsaW5lID0gbmV3IENvZGVQaXBlbGluZSh0aGlzLCAnUGlwZWxpbmUnLCB7XHJcbiAgICAgICAgcGlwZWxpbmVOYW1lOiAnUzNDbGVhbnVwUGlwZWxpbmUnLFxyXG4gICAgICAgIHN5bnRoOiBuZXcgU2hlbGxTdGVwKCdTeW50aFN0ZXAnLCB7XHJcbiAgICAgICAgICBpbnB1dDogQ29kZVBpcGVsaW5lU291cmNlLmdpdEh1YignU2FtaWtzaGEwMjI2MjgvYnVja2V0LWNsZWFudXAtdGhyb3VnaC1jZGsnLCAnbWFpbicsIHsgLy9yZXBsYWNlICdTYW1pa3NoYTAyMjYyOCcgd2l0aCB5b3VyIGdpdGh1YiB1c2VybmFtZSBhbmQgJ3ZwYy1idWNrZXQtdHJhbnNmZXItdGhyb3VnaC1jZGsnIHdpdGggeW91ciBnaXRodWIgcmVwb1xyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogY2RrLlNlY3JldFZhbHVlLnNlY3JldHNNYW5hZ2VyKCdHSVRIVUJfVE9LRU4nKSwgXHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIGNvbW1hbmRzOiBbXHJcbiAgICAgICAgICAgICducG0gY2knLFxyXG4gICAgICAgICAgICAnbnBtIGluc3RhbGwgLWcgYXdzLWNkaycsXHJcbiAgICAgICAgICAgICdjZGsgc3ludGgnLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9KSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBhcHBTdGFnZSA9IG5ldyBTM0NsZWFudXBTdGFnZSh0aGlzLCAnQXBwU3RhZ2UnLCB7XHJcbiAgICAgICAgZW52OiB7XHJcbiAgICAgICAgICBhY2NvdW50OiBwcm9jZXNzLmVudi5DREtfREVGQVVMVF9BQ0NPVU5ULFxyXG4gICAgICAgICAgcmVnaW9uOiBwcm9jZXNzLmVudi5DREtfREVGQVVMVF9SRUdJT04gfHwgJ3VzLWVhc3QtMScsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgXHJcbiAgICAgIHBpcGVsaW5lLmFkZFN0YWdlKGFwcFN0YWdlKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgY2xhc3MgUzNDbGVhbnVwU3RhZ2UgZXh0ZW5kcyBTdGFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWdlUHJvcHMpIHtcclxuICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcbiAgXHJcbiAgICAgIG5ldyBCdWNrZXRDbGVhbnVwVGhyb3VnaENka1N0YWNrKHRoaXMsICdCdWNrZXRDbGVhbnVwVGhyb3VnaENka1N0YWNrJyk7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=