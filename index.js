require('dotenv').config()

const { WebClient } = require('@slack/web-api');

const slackToken = new WebClient(process.env.SLACK_TOKEN);
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;

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