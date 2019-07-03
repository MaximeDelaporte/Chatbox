require('dotenv').config();
const Chatkit = require('@pusher/chatkit-server');

const chatKit = new Chatkit.default({
    instanceLocator: process.env.INSTANCE_LOCATOR,
    key: process.env.KEY
});

module.exports = chatKit;



