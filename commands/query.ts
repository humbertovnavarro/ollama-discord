import { Collection, type Message } from "discord.js";
import { ollama } from "../ollama-client";
export default {
    name: 'ask',
    description: 'Ask a model a question. ask [model default=llama3.2] [prompt]',
    execute: async (message: Message, args: string[]) => {
        const set = new Set();
        (await ollama.list()).models.forEach(model => set.add(model.name));
        let model = "llama3.2";
        let prompt = "";
        if(args[0] && set.has(args[0])) {
            model = args[0];
            prompt = args.splice(1).join(" ");
        } else {
            prompt = args.join(" ");
        }
        await ollama.chat({
            stream: true,
            model,
            messages: 
        })
    }
};