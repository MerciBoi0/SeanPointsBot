require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const { CommandHandler } = require('djs-commander');
const mongoose = require('mongoose');
const path = require('path');


const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});
//client.on('messageCreate', (message) => {
   // console.log(message);
//});
new CommandHandler({
    client,
    eventsPath: path.join(__dirname, 'events'),
    commandsPath: path.join(__dirname, 'commands'),
});

(async() => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('connected to DB');

    client.login(process.env.TOKEN);
})();

client.login(process.env.TOKEN);


