const { SlashCommandBuilder } = require('@discordjs/builders');
const { time } = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('time')
        .setDescription('Shows the local time in different timezones'),
    async execute(interaction) {
        const currentUTC = new Date();
        const currentCET = convertTZ(currentUTC, "Europe/Berlin")
        const currentCST = convertTZ(currentUTC, "America/Chicago")
        const currentPST = convertTZ(currentUTC, "America/Los_Angeles")

        const exampleEmbed = new MessageEmbed()
            .setColor("#ff8800")
            .setTitle("Current time in different timezones")
            .addField("UTC", time(currentUTC) , false)
            .addField("CET", time(currentCET) , false)
            .addField("CST", time(currentCST) , false)
            .addField("PST", time(currentPST) , false)

        await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
    },
};

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
}