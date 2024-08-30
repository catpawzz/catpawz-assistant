const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function getRandomColor() {
    return Math.floor(Math.random() * 16777215);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random-hex')
        .setDescription('Get a random hex color from the bot.'),
    async execute(interaction) {
        const randomColor = getRandomColor();
        const hexColor = randomColor.toString(16).padStart(6, '0');

        const replyEmbed = new EmbedBuilder()
            .setColor(randomColor)
            .setTitle('Here you go!')
            .setDescription(`Your random HEX color is **#${hexColor}**`)
            .setTimestamp()
            .setFooter({ text: process.env.POWERED, iconURL: process.env.ICON });

        await interaction.reply({ embeds: [replyEmbed] });
    },
};