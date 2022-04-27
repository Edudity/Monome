# Monome
Management Bot for Discord used in our Guild

## Libraries
- Node.js
- [discord.js](https://discord.js.org/#/)

## Commands
All the commands are available with the Slashcommand-Functionality in Discord

### Project
- project create [name] - creates a channel in the desired category and adds the issuer to it
- project add [name] [discorduser] - adds a user to the project
- project remove [name] [discorduser] - removes a user from the project
- project finish [name] - finishes the project, closes the channel, archives the conversation and store it somewhere to be retrieved later

### General Commands and Behaviour
- Sets a custom Role for a new user joining the guild
- Sends a "configuration" message into a desired channel
- Be able to connect to information provides (RSS Feed) for Informations on Coding stuff and so on
