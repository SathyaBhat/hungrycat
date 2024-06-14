import {Context, LambdaFunctionURLEvent, APIGatewayProxyResultV2} from 'aws-lambda';
const PUBLIC_KEY = '9c9d12ea9dcfade61884ccb26c830f147c0538142e6a98ab5f63e327a4f12199';
const nacl = require('tweetnacl');

export interface DiscordResponse {
  app_permissions: string;
  application_id: string;
  authorizing_integration_owners: AuthorizingIntegrationOwners;
  entitlements: any[];
  id: string;
  token: string;
  type: number;
  user: User;
  version: number;
  data?: ApplicationCommandData;
}

export interface ApplicationCommandData {
  id: string;
  name: string;
  type: number;
}
export interface AuthorizingIntegrationOwners {}

export interface User {
  avatar: string;
  avatar_decoration_data: null;
  bot: boolean;
  clan: null;
  discriminator: string;
  global_name: string;
  id: string;
  public_flags: number;
  system: boolean;
  username: string;
}

function verifySignature(publicKey: string, signature: string, timestamp: string, body: string) {
  return nacl.sign.detached.verify(Buffer.from(timestamp + body), Buffer.from(signature, 'hex'), Buffer.from(publicKey, 'hex'));
}

export function verifyDiscordRequest(event: LambdaFunctionURLEvent): Boolean {
  const signature: string = event.headers['x-signature-ed25519'] as string;
  const timestamp = event.headers['x-signature-timestamp'] as string;
  const body = event.body as string;
  return verifySignature(PUBLIC_KEY, signature, timestamp, body);
}
