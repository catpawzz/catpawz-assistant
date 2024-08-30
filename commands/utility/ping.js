const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check current bot statistics'),
    async execute(interaction) {
        const replyEmbed = new EmbedBuilder()
            .setColor(parseInt(process.env.HEX, 16))
            .setTitle('Pong! 🏓')
            .setDescription("The bot is currently online!")
            .addFields(
                { name: 'API latency:', value: `${interaction.client.ws.ping}ms`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: process.env.POWERED, iconURL: process.env.ICON });

        await interaction.reply({ embeds: [replyEmbed] });
    },
};