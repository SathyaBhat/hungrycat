import {Context, LambdaFunctionURLEvent, APIGatewayProxyResultV2} from 'aws-lambda';
import {DiscordResponse} from './discord';
const PUBLIC_KEY = "9c9d12ea9dcfade61884ccb26c830f147c0538142e6a98ab5f63e327a4f12199";
const nacl = require("tweetnacl");

function verifySignature(publicKey: string, signature: string, timestamp: string, body: string) {
    return nacl.sign.detached.verify(
        Buffer.from(timestamp + body),
        Buffer.from(signature, "hex"),
        Buffer.from(publicKey, "hex")
    );
}

export const handler = async (event: LambdaFunctionURLEvent, context: Context): Promise<APIGatewayProxyResultV2> => {

    if (!event.body) return {statusCode: 400, body: "No body"};
    if (!event.headers) return {statusCode: 400, body: "No headers"};
    let discordResponse = JSON.parse(event.body) as DiscordResponse;

    if (discordResponse.type === 1) {

        const signature: string = event.headers["x-signature-ed25519"] as string;
        const timestamp = event.headers["x-signature-timestamp"] as string;
        const body = event.body;
        const isVerified = verifySignature(PUBLIC_KEY, signature, timestamp, body);
        if (!isVerified) {
            console.log("Invalid request signature");
            return {statusCode: 401, body: "Invalid request signature"};

        }
        console.log("Valid request signature");
        return {
            statusCode: 200,
            body: JSON.stringify({type: 1}),
            headers: {
                "Content-Type": "application/json",
            }
        };
    }
    return {statusCode: 400, body: "Something went wrong"};
};

