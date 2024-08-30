const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const globalCommands = [];
const guildCommands = [];

// Grab all the command folders from the commands directory
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            if (folder === 'global') {
                globalCommands.push(command.data.toJSON());
            } else {
                guildCommands.push(command.data.toJSON());
            }
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// Deploy commands
(async () => {
    try {
        // Deploy global commands
        console.log(`Started refreshing ${globalCommands.length} global application (/) commands.`);
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: globalCommands },
        );
        console.log(`Successfully reloaded ${globalCommands.length} global application (/) commands.`);

        // Deploy guild-specific commands
        console.log(`Started refreshing ${guildCommands.length} guild-specific application (/) commands.`);
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: guildCommands },
        );
        console.log(`Successfully reloaded ${guildCommands.length} guild-specific application (/) commands.`);

    } catch (error) {
        console.error(error);
    }
})();