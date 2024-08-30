const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

function generatePassword(length = 12) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gen-password')
        .setDescription('Generate a random password')
        .addIntegerOption(option =>
            option.setName('length')
                .setDescription('The length of the password (default: 12)')
                .setMinValue(8)
                .setMaxValue(32)),
    async execute(interaction) {
        const length = interaction.options.getInteger('length') || 12;
        const password = generatePassword(length);

        const replyEmbed = new EmbedBuilder()
            .setColor(parseInt(process.env.HEX, 16))
            .setTitle("Here's your random password!")
            .setDescription(`\`${password}\`\n\nMake sure to store this securely and don't share it with anyone!`)
            .setTimestamp()
            .setFooter({ text: process.env.POWERED, iconURL: process.env.ICON });

        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
    },
}