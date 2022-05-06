require('dotenv').config()

const { WebClient } = require('@slack/web-api')
const { SocketModeClient } = require('@slack/socket-mode');
const { createEventAdapter } = require('@slack/events-api');

const port = process.env.PORT || 3000;
const slackToken = new WebClient(process.env.SLACK_TOKEN);
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);
const socketToken = process.env.SLACK_APP_TOKEN;
const socketMode = new SocketModeClient({ socketToken });

(async () => {
    try {
        await slackToken.chat.postMessage({
            channel: '#app_testing',
            text: `Test to verify that you read this`,
        });
        console.log('Message posted!');
    } catch (error) {
        console.log(error);
    }
})();

slackEvents.on('message', (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

(async () => {
    const server = await slackEvents.start(port);
    console.log(`Listening for events on ${server.address().port}`);
})();