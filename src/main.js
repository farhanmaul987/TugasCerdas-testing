// Pemanggilan file dotenv untuk keperluan token
require('dotenv').config();

// Notes: Bisa juga tanpa melakukan destructuring/pembongkaran
// Contoh:
// Hapus const { token } = process.env;
// Lalu ubah client.login(token); menjadi client.login(process.env.token);

// Pemanggilan Library
const { Client, IntentsBitField } = require('discord.js');

// Inisialisasi Kebutuhan
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// Berbagai Notif Ketika Bot Online
client.on('ready', () => {
    // console.log(`Bot ${client.user.tag} Activated!`);
    console.log(`Bot ${client.user.username} Activated!`);
    // console.log(`Bot ${client.user.id} Activated!`);
});

// Mengaktifkan Event Slash Command
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'bot') {
        return interaction.reply('I have said to you!');
    }

    // Event Slash Command Options and Choices
    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first_number').value;
        const num2 = interaction.options.get('second_number').value;

        interaction.reply(`The sum of ${num1} + ${num2} = ${num1 + num2}`);
    }
    // Event Slash Command Ping
    if (interaction.commandName === 'ping') {
        return interaction.reply('Pong!');
    }
});

// Mengirim Pesan
client.on('messageCreate', (message) => {
    // Memberikan data detail dari pesan
    // console.log(message);

    // Hanya memberikan isi dari pesan
    console.log(message.content);

    // Dapat memberikan detail sesuai kebutuhan
    // console.log(message.author.globalName);
});

// Membalas Pesan
client.on('messageCreate', (message) => {

    // Pembalasan pesan default
    if (message.content === 'Halo') {
        message.reply('Halo juga!');
    }

    // Validasi pencegahan balasan berulang (matikan validasi di bawah lalu ketik "Loop" untuk melihat hasil perulangan)
    if (message.author.bot) {
        return;
    }

    // Contoh pesan berulang/balasan akan looping
    if (message.content === 'Loop') {
        message.reply('Loop');
    }
});

// Token dari Discord Developers
client.login(process.env.TOKEN);
// Jalankan bot dengan ketik "npm run start" atau "npm run dev" di terminal