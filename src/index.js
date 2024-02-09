require('dotenv').config();
// Import Class Client dan IntentsBitField dari library
const mongoose = require('mongoose');
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        // eventHandler function
        eventHandler(client);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();


client.login(process.env.TOKEN)