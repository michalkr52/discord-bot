import { CacheType, ClientEvents, CommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
    data: SlashCommandBuilder,
    execute: (interaction: CommandInteraction<CacheType>) => Promise<void>
}

export interface Event {
    name: keyof ClientEvents,
    once?: boolean,
    execute: (...args: any[]) => Promise<void>
}
