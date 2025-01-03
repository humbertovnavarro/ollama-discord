import type { Message } from "discord.js";

// Define a simple ping command
export default {
    name: 'ping',
    description: 'Replies with Pong!',
    execute: async (message: Message, args: string[]) => {
        await message.reply('Pong!');
    }
};