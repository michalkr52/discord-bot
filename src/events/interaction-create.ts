import { ChatInputCommandInteraction, CommandInteraction, Events } from "discord.js";
import { Event } from "../types";


const event: Event = {
    name: Events.InteractionCreate,
    async execute(interaction: CommandInteraction) {
        if (!(interaction instanceof ChatInputCommandInteraction) || !interaction.isChatInputCommand()) return;
        // console.log("Interaction:", interaction);

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
};

export default event;
