// var express = require('express');
// var app = express();


// const ViberBot = require('viber-bot').Bot;
// const BotEvents = require('viber-bot').Events;

// const bot = new ViberBot({
// 	authToken: "4a02484a4b67d0f0-640b07a6f0f44ff5-cd707c9f804bacae",
// 	name: "",
// 	avatar: "" // It is recommended to be 720x720, and no more than 100kb.
// });

// // Perfect! Now here's the key part:
// bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
// 	// Echo's back the message to the client. Your bot logic should sit here.
// 	response.send(message);
// });
// const TextMessage = require('viber-bot').Message.Text;

// // A simple regular expression to answer messages in the form of 'hi' and 'hello'.
// bot.onTextMessage(/^hi|hello$/i, (message, response) =>
//     response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}`)));


// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
// app.use("/viber/webhook", bot.middleware());
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });





// // Wasn't that easy? Let's create HTTPS server and set the webhook:

// // Viber will push messages sent to this URL. Web server should be internet-facing.
// //const webhookUrl = process.env.WEBHOOK_URL;


const ViberBot = require("viber-bot").Bot,
BotEvents = require("viber-bot").Events,
TextMessage = require("viber-bot").Message.Text,
express = require("express");
const app = express();
process.env.EXPOSE_URL = "https://viber-bot-tes-t.herokuapp.com"
process.env.BOT_ACCOUNT_TOKEN = "4a02484a4b67d0f0-640b07a6f0f44ff5-cd707c9f804bacae"
if (!process.env.BOT_ACCOUNT_TOKEN) {
    console.log("Could not find bot account token key.");
    return;
}
if (!process.env.EXPOSE_URL) {
    console.log("Could not find exposing url");
    return;
}

const bot = new ViberBot({
    authToken: process.env.BOT_ACCOUNT_TOKEN,
    name: "Botan",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Katze_weiss.png"
});
bot.on(BotEvents.SUBSCRIBED, response => {
    response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me anything.`));
});
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    response.send(new TextMessage(`А я не дам`));
});
const port = process.env.PORT || 3000;
app.use("/viber/webhook", bot.middleware());
app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
    bot.setWebhook(`${process.env.EXPOSE_URL}/viber/webhook`).catch(error => {
        console.log('Can not set webhook on following server. Is it running?');
        console.error(error);
        process.exit(1);
    });
});

///https://3bf17730.ngrok.io
// https://chatbotslife.com/build-viber-bot-with-nodejs-a21487e5b65