require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
// ApplicationCommandOptionType: Berfungsi untuk menentukan tipe opsi pada command 'add'

const commands = [
    // Ubah nama command dan deskripsi untuk setting command baru, lalu ketik 'npm run regist' di terminal
    {
        name: 'bot',
        description: 'Dont use it!',
    },
    // Slash Command Option and Choices
    {
        name: 'add',
        description: 'Adds two numbers.',
        options: [
            {
                name: 'first_number',
                description: 'The first number.',
                type: ApplicationCommandOptionType.Number,
                // (^) Number dapat diubah dalam berbagai tipe, jangan lupa ubah value dalam choices sesuai tipe
                // Menambahkan pilihan angka dalam opsi tanpa perlu input manual di Discord
                choices: [
                    {
                        name: 'One',
                        value: 1,
                    },
                    {
                        name: 'Two',
                        value: 2,
                    },
                    {
                        name: 'Three',
                        value: 3,
                    }
                ],
                // required: true membuat opsi ini wajib diisi
                required: true,
            },
            {
                name: 'second_number',
                description: 'The second number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },
    // Custom Embeds
    {
        name: 'embed',
        description: 'Create an embed!',
    },
    // Slash Command Ping
    {
        name: 'ping',
        description: 'Ping the bot!',
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log('Slash commands were registered successfully!');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();