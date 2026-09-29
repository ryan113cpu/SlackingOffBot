const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.message(async ({ message }) => {
  console.log(`User message.user: "${message.text}"`);
});

app.command('/parrot_nap', async ({ ack, respond }) => {
  await ack();
  const excuses = [
    "My router overheated and is currently rebooting.",
    "My cat pulled out the power strip chord.",
    "Compiling code assets right now, this build takes at least an hour.",
    "Stuck in a local environment debugging loop, will check back soon."
  ];
  const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
  await respond("Your Excuse: " + randomExcuse);
});

app.command('/parrot_coffee', async ({ ack, respond }) => {
  await ack();
  const statuses = [
    "Away - Quick Coffee Run",
    "Deep Work - Focus Blocks Enabled",
    "Investigating Server Outage (Do Not Disturb)",
    "Client Alignment Sync"
  ];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  await respond("Use this fake status to look busy: `" + randomStatus + "`");
});

app.command('/parrot_fakeout', async ({ ack, respond }) => {
  await ack();
  await respond('PANIC DISPATCHED: "Sorry to drop suddenly, but my container instance just threw a critical threshold alert. I need to fix this right now."');
});

(async () => {
  await app.start();
  console.log('Online');
  setInterval(() => {}, 1000);
})();
