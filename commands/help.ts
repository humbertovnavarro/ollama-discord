import { EmbedBuilder, type Message, type Command } from "discord.js";
// Define a simple help command
let description: string = "";
export default {
    name: 'help',
    description: 'Replies with a list of commands',
    execute: async (message: Message, args: string[]) => {
        if(!description) {
            const commands = Array.from(message.client.commands).map(([_, command]) => command);
            description = commands.map((c) => `**${c.name}**: ${c.description}`).join('\n');
        }
        
        const embed = new EmbedBuilder()
        .setTitle('Commands')
        .setDescription(description);

        await message.reply({ embeds: [embed] });
    }
};