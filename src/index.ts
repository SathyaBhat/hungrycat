import {LambdaFunctionURLEvent, APIGatewayProxyResultV2} from 'aws-lambda';
import * as interactions from 'discord-interactions';

import {DiscordResponse, verifyDiscordRequest} from './discord';
import {FEEDME} from '../hungrycatbuilder/commands';

export const handler = async (event: LambdaFunctionURLEvent): Promise<APIGatewayProxyResultV2> => {
  if (!event.body) return {statusCode: 400, body: 'No body'};
  if (!event.headers) return {statusCode: 400, body: 'No headers'};

  const discordResponse = JSON.parse(event.body) as DiscordResponse;
  console.log(discordResponse);

  // verify if discord sent this - if not, exit.
  const isVerified = verifyDiscordRequest(event);
  if (!isVerified) {
    console.log('Invalid request signature');
    return {statusCode: 401, body: 'Invalid request signature'};
  }

  // ack and send back a ping response
  if (discordResponse.type === interactions.InteractionType.PING) {
    return {
      statusCode: 200,
      body: JSON.stringify({type: interactions.InteractionResponseType.PONG}),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  if (discordResponse.type === interactions.InteractionType.APPLICATION_COMMAND) {
    if (discordResponse.data?.name === FEEDME.name) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          type: interactions.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'What does catto want?',
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
