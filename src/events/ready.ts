import { Client, Events } from "discord.js";
import { Event } from "../types";
import register_commands from "../register-commands";


const event: Event = {
    name: Events.ClientReady,
    once: true,
    async execute(client: Client) {
        if (client.user == null) return;
        await register_commands(client.commands);
        console.log(`Ready! Logged in as ${client.user.tag}`)
    }
};

export default event;
