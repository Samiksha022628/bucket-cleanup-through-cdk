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
                input: pipelines_1.CodePipelineSource.gitHub('Samiksha022628/bucket-cleanup-through-cdk', 'main', // replace 'Samiksha022628' with your github username and 'bucket-cleanup-through-cdk' with your github repo
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
exports.PipelineStack = PipelineStack;
class S3CleanupStage extends aws_cdk_lib_1.Stage {
    constructor(scope, id, props) {
        super(scope, id, props);
        new bucket_cleanup_through_cdk_stack_1.BucketCleanupThroughCdkStack(this, 'BucketCleanupThroughCdkStack');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBbUU7QUFFbkUscURBQW9GO0FBQ3BGLHlGQUFrRjtBQUNsRixtQ0FBbUM7QUFFbkMsTUFBYSxhQUFjLFNBQVEsbUJBQUs7SUFDdEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLFFBQVEsR0FBRyxJQUFJLHdCQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNoRCxZQUFZLEVBQUUsbUJBQW1CO1lBQ2pDLEtBQUssRUFBRSxJQUFJLHFCQUFTLENBQUMsV0FBVyxFQUFFO2dCQUNoQyxLQUFLLEVBQUUsOEJBQWtCLENBQUMsTUFBTSxDQUFDLDJDQUEyQyxFQUFFLE1BQU0sRUFBRSw0R0FBNEc7Z0JBQ2hNO29CQUNBLGNBQWMsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxzRkFBc0Y7aUJBQ3ZKLENBQUM7Z0JBQ0YsUUFBUSxFQUFFO29CQUNSLFFBQVE7b0JBQ1Isd0JBQXdCO29CQUN4QixXQUFXO2lCQUNaO2FBQ0YsQ0FBQztTQUNILENBQUMsQ0FBQztRQUVILE1BQU0sUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDcEQsR0FBRyxFQUFFO2dCQUNILE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQjtnQkFDeEMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLElBQUksV0FBVzthQUN0RDtTQUNGLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNGO0FBNUJILHNDQTRCRztBQUVELE1BQU0sY0FBZSxTQUFRLG1CQUFLO0lBQ2hDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSwrREFBNEIsQ0FBQyxJQUFJLEVBQUUsOEJBQThCLENBQUMsQ0FBQztJQUN6RSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcywgU3RhZ2UsIFN0YWdlUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xyXG5pbXBvcnQgeyBDb2RlUGlwZWxpbmUsIENvZGVQaXBlbGluZVNvdXJjZSwgU2hlbGxTdGVwIH0gZnJvbSAnYXdzLWNkay1saWIvcGlwZWxpbmVzJztcclxuaW1wb3J0IHsgQnVja2V0Q2xlYW51cFRocm91Z2hDZGtTdGFjayB9IGZyb20gJy4vYnVja2V0LWNsZWFudXAtdGhyb3VnaC1jZGstc3RhY2snO1xyXG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBpcGVsaW5lU3RhY2sgZXh0ZW5kcyBTdGFjayB7XHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICBjb25zdCBwaXBlbGluZSA9IG5ldyBDb2RlUGlwZWxpbmUodGhpcywgJ1BpcGVsaW5lJywge1xyXG4gICAgICAgIHBpcGVsaW5lTmFtZTogJ1MzQ2xlYW51cFBpcGVsaW5lJyxcclxuICAgICAgICBzeW50aDogbmV3IFNoZWxsU3RlcCgnU3ludGhTdGVwJywge1xyXG4gICAgICAgICAgaW5wdXQ6IENvZGVQaXBlbGluZVNvdXJjZS5naXRIdWIoJ1NhbWlrc2hhMDIyNjI4L2J1Y2tldC1jbGVhbnVwLXRocm91Z2gtY2RrJywgJ21haW4nLCAvLyByZXBsYWNlICdTYW1pa3NoYTAyMjYyOCcgd2l0aCB5b3VyIGdpdGh1YiB1c2VybmFtZSBhbmQgJ2J1Y2tldC1jbGVhbnVwLXRocm91Z2gtY2RrJyB3aXRoIHlvdXIgZ2l0aHViIHJlcG9cclxuICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgYXV0aGVudGljYXRpb246IGNkay5TZWNyZXRWYWx1ZS5zZWNyZXRzTWFuYWdlcignR0lUSFVCX1RPS0VOJyksIC8vIHJlcGxhY2UgdGhlICdHSVRIVUJfVE9LRU4nIHdpdGggeW91ciBhd3Mgc2VjcmV0IG5hbWUgdXNlZCB0byBzdG9yZSB0aGUgZ2l0aHViIHRva2VuXHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIGNvbW1hbmRzOiBbXHJcbiAgICAgICAgICAgICducG0gY2knLFxyXG4gICAgICAgICAgICAnbnBtIGluc3RhbGwgLWcgYXdzLWNkaycsXHJcbiAgICAgICAgICAgICdjZGsgc3ludGgnLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9KSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBhcHBTdGFnZSA9IG5ldyBTM0NsZWFudXBTdGFnZSh0aGlzLCAnQXBwU3RhZ2UnLCB7XHJcbiAgICAgICAgZW52OiB7XHJcbiAgICAgICAgICBhY2NvdW50OiBwcm9jZXNzLmVudi5DREtfREVGQVVMVF9BQ0NPVU5ULFxyXG4gICAgICAgICAgcmVnaW9uOiBwcm9jZXNzLmVudi5DREtfREVGQVVMVF9SRUdJT04gfHwgJ3VzLWVhc3QtMScsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgXHJcbiAgICAgIHBpcGVsaW5lLmFkZFN0YWdlKGFwcFN0YWdlKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgY2xhc3MgUzNDbGVhbnVwU3RhZ2UgZXh0ZW5kcyBTdGFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWdlUHJvcHMpIHtcclxuICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcbiAgXHJcbiAgICAgIG5ldyBCdWNrZXRDbGVhbnVwVGhyb3VnaENka1N0YWNrKHRoaXMsICdCdWNrZXRDbGVhbnVwVGhyb3VnaENka1N0YWNrJyk7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=