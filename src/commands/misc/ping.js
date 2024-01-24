module.exports = {
    name: 'ping',
    description: 'Pong!',
    devOnly: Boolean,
    // options: Object[],
    // deleted: true,

    callback: (client, interaction) => {
        interaction.reply({
            content: `Ping: ${client.ws.ping}ms`,
            ephemeral: true,
        });
    },
};