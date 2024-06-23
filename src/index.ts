import * as dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import importedCommands from "./commands";
import importedEvents from "./events";


// Config, environmental variables
dotenv.config({ path: "~/source/discord-bot/.env" });


const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates
];

const client = new Client({ intents: intents });

// Load commands
client.commands = new Map();
for (const command of importedCommands) {
    client.commands.set(command.data.name, command);
}

// Load events
for (const event of importedEvents) {
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Startup
client.login(process.env.DISCORD_TOKEN);
