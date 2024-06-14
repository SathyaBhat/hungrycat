// import fetch from "node-fetch";

const token = process.env.DISCORD_TOKEN;
const applicationId = process.env.DISCORD_APPLICATION_ID;
const url = `https://discord.com/api/v10/applications/${applicationId}/commands`;
import {FEEDME} from './commands';

export async function registerCommands() {

  if (!token || !applicationId) {
    console.error('Please set the DISCORD_TOKEN and DISCORD_APPLICATION_ID environment variables.');
    process.exit(1);
  }



  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${token}`,
    },
    method: 'PUT',
    body: JSON.stringify([FEEDME]),
  });

  if (response.ok) {
    console.log('Registered all commands');
  } else {
    console.error('Error registering commands');
    const text = await response.text();
    console.error(text);
  }
  return response;

}