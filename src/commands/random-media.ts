import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { Command, MediaDirectory } from "../types";
import mediaListJson from "../../data/media-list.json";


const mediaPath = "/home/krami/bot-media";
const mediaList: Array<MediaDirectory> = mediaListJson;

// Format conforming to SlashCommandStringOption (name, value)
const requestMediaList = mediaList.map(({
    directory: value,
    ...rest
}) => ({
    value,
    ...rest
}));

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("losuj")
        .setDescription("Wyślij losowe media z podanej kategorii")
        .addStringOption(option => 
            option.setName("kategoria")
                .setDescription("Kategoria, z której losowane będą media")
                .setRequired(true)
                .addChoices(requestMediaList)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const directory = interaction.options.getString("kategoria");
        const mediaItem = mediaList.find(media => media.directory === directory);
        let category = mediaItem!.name;
        if (mediaItem?.prettyName) category = mediaItem!.prettyName;

        if (directory === null) {
            await interaction.reply("Niepoprawna kategoria!");
        }
        else {
            await interaction.deferReply();

            const directoryPath = join(mediaPath, directory);
            let file = undefined;

            const files = readdirSync(directoryPath, { withFileTypes: true });
            let fileIndex = 0;
            let filesFound = 0;

            if (files !== undefined && files.length > 0) {
                filesFound = files.length;
                fileIndex = Math.round(Math.random() * (filesFound - 1));
                file = files[fileIndex];
            }

            if (file !== undefined) {
                await interaction.editReply({
                    content: (`## [${fileIndex}/${filesFound}]
                        Kategoria: **${category}**
                        `).replace(/  +/g, ""),
                    files: [{
                        name: file.name,
                        attachment: join(directoryPath, file.name)
                    }]
                });
            }
            else {
                await interaction.editReply("Nie udało się wylosować mediów.");
            }
        }
    }
}

export default command;
