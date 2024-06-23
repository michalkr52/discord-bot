import { ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
import { 
    AudioPlayerStatus, 
    NoSubscriberBehavior, 
    VoiceConnectionStatus, 
    createAudioPlayer, 
    createAudioResource, 
    entersState, 
    joinVoiceChannel 
} from "@discordjs/voice";


const purrSoundPath = "data/purr.mp3";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("mrucz")
        .setDescription("Mrucz na kanale przez określony czas")
        .addNumberOption(option => 
            option.setName("czas_trwania")
                .setDescription("Czas trwania mruczenia w sekundach")
                .setRequired(false)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const duration = interaction.options.getNumber("czas_trwania");
        if (duration !== null) {
            await interaction.reply({ content: `Będę mruczeć na twoim kanale przez ${duration} sekund.`, ephemeral: true });
        }
        else {
            await interaction.reply({ content: `Będę mruczeć na twoim kanale.`, ephemeral: true });
        }
        
        const member = interaction.member as GuildMember;
        const channel = member.voice.channel;

        if (channel) {
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            const audioPlayer = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause
                }
            });

            connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
                try {
                    // Seems to be reconnecting to a new channel - ignore disconnect
                    await Promise.race([
                        entersState(connection, VoiceConnectionStatus.Signalling, 5000),
                        entersState(connection, VoiceConnectionStatus.Connecting, 5000),
                    ]);
                } catch (error) {
                    // Seems to be a real disconnect which SHOULDN'T be recovered from
                    audioPlayer.stop();
                    if (connection.state.status !== VoiceConnectionStatus.Destroyed) {
                        connection.destroy();
                    }
                }
            });

            const subscription = connection.subscribe(audioPlayer);
            if (subscription) {
                audioPlayer.play(createAudioResource(purrSoundPath));
                // Loop
                audioPlayer.on(AudioPlayerStatus.Idle, () => audioPlayer.play(createAudioResource(purrSoundPath)));
                // If duration set, stop after timeout
                if (duration !== null) {
                    setTimeout(() => {
                        subscription.unsubscribe();
                        if (connection.state.status !== VoiceConnectionStatus.Destroyed) {
                            connection.disconnect();
                            connection.destroy();
                        }
                    }, duration * 1000);
                }
            }
        }
    }
}

export default command;
