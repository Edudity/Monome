const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require("fs");
const path = require("path");
require('dotenv').config({ path: path.join(__dirname, "environment","settings.env") })

const BOT_TOKEN = process.env.BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const APPLICATION_ID= process.env.APPLICATION_ID;

const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, "/commands")).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);