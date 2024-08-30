const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('creator')
        .setDescription('Get a link to the creators GitHub profile'),
    async execute(interaction) {
        const replyEmbed = new EmbedBuilder()
            .setColor(parseInt(process.env.HEX, 16))
            .setTitle(process.env.CREATOR)
            .setURL(process.env.CREATOR_LINK)
            .setDescription("Here's a link to the creator!")
            .setTimestamp()
            .setFooter({ text: process.env.POWERED, iconURL: process.env.ICON });

        await interaction.reply({ embeds: [replyEmbed] });
    },
};