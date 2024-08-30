const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the command author.'),
    async execute(interaction) {
        const replyEmbed = new EmbedBuilder()
            .setColor(parseInt(process.env.HEX, 16))
            .setTitle('User information')
            .setDescription("Here's some information about the command author!")
            .addFields(
                { name: 'Run by:', value: (interaction.user.username).toString(), inline: true },
                { name: 'Member joined:', value: (interaction.member.joinedAt).toString(), inline: true },
            )
            .setTimestamp()
            .setFooter({ text: process.env.POWERED, iconURL: process.env.ICON });

        await interaction.reply({ embeds: [replyEmbed] });
    },
};