const path = require("path");
const fs = require("fs");
const { Client, Intents, Collection} = require('discord.js');

require('dotenv').config({ path: path.join(__dirname, "environment","settings.env") });
// Vars to hold the secrets
const BOT_TOKEN = process.env.BOT_TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, "/commands")).filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync(path.join(__dirname, "/events")).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(__dirname,"commands",file));
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
    const event = require(path.join(__dirname,"events",file));
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(BOT_TOKEN).then(
    (data) => console.log("Bot started successfully"),
    (err) => console.log("Something went wrong starting the bot", err)
);