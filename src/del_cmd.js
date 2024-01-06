require('dotenv').config();
const { REST, Routes } = require('discord.js');


const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

console.log('Deleting slash commands...');

rest.delete(Routes.applicationGuildCommand(
    process.env.CLIENT_ID,
    process.env.GUILD_ID,
    // Command ID (https://discordjs.guide/slash-commands/deleting-commands.html#deleting-specific-commands)
    '1193056302218350635'
))
    .then(() => console.log('Slash Commands were deleted successfully!'))
    .catch(console.error);

// Jalankan kode penghapusan dengan ketik "npm run del" di terminal