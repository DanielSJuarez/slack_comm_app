require('dotenv').config()
const { WebClient } = require('@slack/web-api')
const { SocketModeClient } = require('@slack/socket-mode');
// const { createEventAdapter } = require('@slack/events-api');

// const port = process.env.PORT || 3000;
// const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
// const slackEvents = createEventAdapter(slackSigningSecret);

const socketToken = process.env.SOCKET_TOKEN;
console.log({ socketToken });
console.log(socketToken);
const socketClient = new SocketModeClient(socketToken);
const slackToken = new WebClient(process.env.SLACK_TOKEN);


const messageResponse = async (message) => {
    try {
        await slackToken.chat.postMessage({
            channel: '#app_testing',
            text: `I have seen your message ${message}! What can I help you with`,
        });
        console.log('Message posted!');
    } catch (error) {
        console.log(error);
    }
}

socketClient.on('message', async ({ event }) => {
    const message = event.message;
    console.log(event);
    if (message.toUpdateCase() === 'HELP') {
        messageResponse(message);
    }
});

(async () => {
    await socketClient.start();
})();
