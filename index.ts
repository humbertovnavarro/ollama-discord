import { Client, Message } from 'discord.js';
const client = new Client({ intents: ["Guilds", "MessageContent"] });
import { readdirSync } from 'fs';

type Command = {
    name: string;
    description: string;
    execute: (message: Message, args: string[]) => Promise<void>;
}

// Create a collection to store commands
const commands = new Map<string, Command>();

const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.ts'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`).default as Command;
    console.log(`Command loaded: ${command.name}`);
    commands.set(command.name, command);
}

// Event listener for when the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.commands = commands;


// Event listener for message events
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    if (!args) return;

    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;

    const command = commands.get(commandName);

    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        await message.reply('There was an error executing that command!');
    }
});

// Login to Discord with your app's token
client.login(process.env.DISCORD_TOKEN);