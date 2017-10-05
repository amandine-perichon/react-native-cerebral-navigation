import { Config } from 'aws-sdk/dist/aws-sdk-react-native';

import {
  CognitoUserPool
} from 'react-native-aws-cognito-js';

const appConfig = {
  'region': 'us-east-1',
  'identityPoolId': 'us-west-2:443ecdc1-8d03-40a6-9f6e-c266bbc10f37',
  'userPoolId': 'us-west-2_gIdVzRHXF',
  'clientId': '531d74n8onl63nuuo0v0a8jvo5'
};

// setting config
Config.region = appConfig.region;

const poolData = {
  UserPoolId: appConfig.userPoolId,
  ClientId: appConfig.clientId
};
const userPool = new CognitoUserPool(poolData);

export {
  Config,
  userPool
};
