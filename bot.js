const { App } = require('@slack/bolt');
require('dotenv').config();

console.log("----------------------------------------");
console.log("DEBUG BOT CONFIGURATION:");
console.log("Bot Token Loaded:", process.env.SLACK_BOT_TOKEN ? "YES (" + process.env.SLACK_BOT_TOKEN.substring(0, 8) + "...)" : "NO");
console.log("App Token Loaded:", process.env.SLACK_APP_TOKEN ? "YES (" + process.env.SLACK_APP_TOKEN.substring(0, 8) + "...)" : "NO");
console.log("----------------------------------------");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.message(async ({ message }) => {
  console.log(`User message.user: "\${message.text}"`);
});

app.command('/hackaclub_excuse', async ({ ack, respond }) => {
  await ack();
  const excuses = [
    "My internet provider is doing emergency maintenance.",
    "My cat stepped on the power strip button.",
    "Compiling code... it's going to take at least an hour.",
    "I'm stuck in an infinite loop debugging a production issue."
  ];
  const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
  await respond(`Your Excuse: \${randomExcuse}`);
});

app.command('/hackaclub_status', async ({ ack, respond }) => {
  await ack();
  const statuses = [
    "Deep Work - Focus Blocks Only",
    "Investigating Outage (Do Not Disturb)",
    "Brainstorming Architecture Docs",
    "Client Alignment Call"
  ];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  await respond(`Use this fake status to look busy: \`${randomStatus}\``);
});

app.command('/hackaclub_panic', async ({ ack, respond }) => {
  await ack();
  await respond(`PANIC DISPATCHED: "Hey, sorry to cut this short, but the server monitoring tool just sent a critical alert. I need to drop and look at this right now!"`);
});

(async () => {
  await app.start();
  console.log('Online');
  setInterval(() => {}, 1000);
})();