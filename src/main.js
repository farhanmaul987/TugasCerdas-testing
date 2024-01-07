// HANYA PEMBELAJARAN BASIC, LEBIH LANJUT PINDAH KE INDEX.JS

// Pemanggilan file dotenv untuk keperluan token
require('dotenv').config();

// Notes: Bisa juga melakukan destructuring/pembongkaran (tidak direkomendasikan)
// Contoh:
// Ketik const { token } = process.env;
// Lalu ubah client.login(process.env.token.); menjadi client.login(token);

// Pemanggilan Library
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js');
// EmbedBuilder: Membuat Embed
// ActivityType: Mengatur status/presence

// Inisialisasi Kebutuhan
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// Random Status/Presence
let status = [
    {
        name: 'Skripsi!!!',
        type: ActivityType.Playing,
    },
    {
        name: 'Random Streamer',
        type: ActivityType.Streaming,
        url: 'https://www.twitch.tv/jingggxd'
    },
    {
        name: 'Revisi!',
        type: ActivityType.Competing,
    },
];

// Berbagai Notif Ketika Bot Online
client.on('ready', () => {
    // console.log(`Bot ${client.user.tag} Activated!`);
    console.log(`Bot ${client.user.username} Activated!`);
    // console.log(`Bot ${client.user.id} Activated!`);

    // Bot Status/Presence
    // client.user.setActivity({
    // Default Presence
    // name: 'Skripsi!!!',
    // type: ActivityType.Watching,
    // Jika type nya Streaming
    // name: 'Skripsi!!!',
    // type: ActivityType.Streaming,
    // url: 'https://twitch.tv/username'
    // });

    // Random Status/Presence
    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random])
    }, 10000);
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

// Mengaktifkan Event Slash Command
client.on('interactionCreate', (interaction) => {
    //  Pengecekan event yang dilakukan hanya berlaku untuk slash command (/)
    if (!interaction.isChatInputCommand()) return;

    // Event Slash Command Default
    if (interaction.commandName === 'bot') {
        return interaction.reply('I have said to you!');
    }

    // Event Slash Command Options and Choices
    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first_number').value;
        const num2 = interaction.options.get('second_number').value;

        interaction.reply(`The sum of ${num1} + ${num2} = ${num1 + num2}`);
    }
    // Custom Embeds
    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('Bagian Title')
            // Menyematkan link pada title (sepemahaman: tidak bisa dipakai pada bagian selain title)
            .setURL('https://discordjs.guide/')
            .setDescription('Bagian Deskripsi...')
            .setAuthor({ name: 'TugasCerdas', iconURL: 'https://i.imgur.com/oEiPAnQ.png', url: 'https://discordjs.guide/' })
            .setThumbnail('https://i.imgur.com/oEiPAnQ.png')
            // Jika ingin menggunakan warna spesifik: .setColor(0xff0000);
            .setColor('Random')
            .addFields(
                // Normal Field
                { name: 'Regular field title', value: 'Some value here' },
                // Enter 1 baris
                { name: '\u200B', value: '\u200B' },
                // Inline Fields
                { name: '1st Title Field', value: 'Value 1 here', inline: true },
                { name: '2nd Title Field', value: 'Value 2 here', inline: true },
                { name: '3rd Title Field', value: 'Value 3 here', inline: true }
            )
            .setImage('https://i.imgur.com/zY2OeyM.jpeg')
            .setTimestamp()
            .setFooter({ text: 'Footer Text', iconURL: 'https://i.imgur.com/oEiPAnQ.png' });

        // Mengirim Embed
        interaction.reply({ embeds: [embed] });
    }

    // Event Slash Command Ping
    if (interaction.commandName === 'ping') {
        return interaction.reply('Pong!');
    }
});
// Mengirim Custom Embeds tanpa menggunakan slash command (/), cukup mengetik embed
client.on('messageCreate', (message) => {
    if (message.content === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('Bagian Title')
            // Menyematkan link pada title (sepemahaman: tidak bisa dipakai pada bagian selain title)
            .setURL('https://discordjs.guide/')
            .setDescription('Bagian Deskripsi...')
            .setAuthor({ name: 'TugasCerdas', iconURL: 'https://i.imgur.com/oEiPAnQ.png', url: 'https://discordjs.guide/' })
            .setThumbnail('https://i.imgur.com/oEiPAnQ.png')
            // Jika ingin menggunakan warna spesifik: .setColor(0xff0000);
            .setColor('Random')
            .addFields(
                // Normal Field
                { name: 'Regular field title', value: 'Some value here' },
                // Enter 1 baris
                { name: '\u200B', value: '\u200B' },
                // Inline Fields
                { name: '1st Title Field', value: 'Value 1 here', inline: true },
                { name: '2nd Title Field', value: 'Value 2 here', inline: true },
                { name: '3rd Title Field', value: 'Value 3 here', inline: true }
            )
            .setImage('https://i.imgur.com/zY2OeyM.jpeg')
            .setTimestamp()
            .setFooter({ text: 'Footer Text', iconURL: 'https://i.imgur.com/oEiPAnQ.png' });

        // Mengirim Embed
        message.reply({ embeds: [embed] });
        // Mengirim Embed tanpa mentag peminta pesan
        // message.channel.send({ embeds: [embed] });
    }
});

// Token dari Discord Developers
client.login(process.env.TOKEN);
// Jalankan bot dengan ketik "npm run start" atau "npm run dev" di terminal