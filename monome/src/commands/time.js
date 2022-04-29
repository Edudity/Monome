const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('time')
        .setDescription('Changes the Description of the bot'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};