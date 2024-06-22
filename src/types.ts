import { 
    CacheType, 
    ChatInputCommandInteraction, 
    ClientEvents, 
    SlashCommandBuilder, 
    SlashCommandOptionsOnlyBuilder 
} from "discord.js";


export interface Command {
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder,
    execute: (interaction: ChatInputCommandInteraction<CacheType>
    ) => Promise<void>
}

export interface Event {
    name: keyof ClientEvents,
    once?: boolean,
    execute: (...args: any[]) => Promise<void>
}

export interface MediaDirectory {
    name: string,
    directory: string,
    prettyName?: string
}
