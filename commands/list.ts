import { EmbedBuilder, type Message } from "discord.js";
import { ollama } from "../ollama-client";

// Define a simple ping command
export default {
    name: 'list',
    description: 'Replies with a list of all pulled models.',
    execute: async (message: Message, _: string[]) => {
        const response = await ollama.list();
        const models = response.models.map(model => model.name + " | " + model.size).join("\n");
        const embed = new EmbedBuilder()
        .setTitle("Ollama Models")
        .setDescription(models);
        await message.reply({embeds: [embed]});
    }
};