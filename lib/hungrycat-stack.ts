import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {NodejsFunction, OutputFormat} from 'aws-cdk-lib/aws-lambda-nodejs';
import {FunctionUrlAuthType, Runtime} from 'aws-cdk-lib/aws-lambda';

export class HungrycatStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // the banner bit is because esbuild cannot convert the commonjs requirestatements to static esm imports
    // see https://github.com/evanw/esbuild/issues/1921
    // and https://github.com/aws/aws-sam-cli/issues/4827
    // and https://aws.plainenglish.io/significantly-improve-typescript-lambda-function-readability-in-aws-console-613bc5ae98f6
    const hungryCatFunction = new NodejsFunction(this, 'hungryCat', {
      functionName: 'hungryCat',
      runtime: Runtime.NODEJS_18_X,
      entry: 'src/index.ts',
      bundling: {
        banner: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
        format: OutputFormat.ESM,
      },
    });
    const hungryCatFunctionUrl = hungryCatFunction.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {allowedOrigins: ['*']},
    });
    new cdk.CfnOutput(this, 'FunctionUrl', {value: hungryCatFunctionUrl.url});
    new cdk.CfnOutput(this, 'FunctionArn', {
      value: hungryCatFunction.functionArn,
    });
  }
}
