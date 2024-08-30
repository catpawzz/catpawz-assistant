const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('repo')
        .setDescription('Get a link to the bot repo'),
    async execute(interaction) {
        const replyEmbed = new EmbedBuilder()
            .setColor(parseInt(process.env.HEX, 16))
            .setTitle(process.env.NAME + ' By ' + process.env.CREATOR)
            .setURL(process.env.REPO)
            .setDescription("Here's a link to the repo!")
            .setTimestamp()
            .setFooter({ text: process.env.POWERED, iconURL: process.env.ICON });

        await interaction.reply({ embeds: [replyEmbed] });
    },
};