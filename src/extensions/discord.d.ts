import { SlashCommandBuilder } from "discord.js";

export * from "discord.js";

declare module "discord.js" {
    export interface Client extends Client {
        commands: Map<string, Command>
    }
}
