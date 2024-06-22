import "dotenv/config";
import { REST, Routes } from "discord.js";
import { Command } from "./types";


async function register_commands(commands: Map<string, Command>) {    
    // Construct and prepare an instance of the REST module
    if (process.env.DISCORD_TOKEN == undefined) throw new Error("No discord token found!");
    const rest = new REST().setToken(process.env.DISCORD_TOKEN);
    const requestBody = Array.from(commands.values()).map((command) => command.data.toJSON());
    
    // Deploy commands
    try {
        if (process.env.DISCORD_APP_ID == undefined) throw new Error("No discord app ID found!");
        const data = await rest.put(
            Routes.applicationCommands(process.env.DISCORD_APP_ID),
            { body: Array.from(requestBody) },
        );
        console.log("Successfully registered commands, response =", data);
    } catch (error) {
        console.error(error);
    }
}

export default register_commands;
