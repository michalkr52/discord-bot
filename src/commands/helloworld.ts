import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("helloworld")
        .setDescription("Pierwsza komenda"),
    async execute(interaction: CommandInteraction) {
        await interaction.reply("Hello World!");
    }
}

export default command;
