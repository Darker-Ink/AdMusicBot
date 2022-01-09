const { Message, Client } = require("discord.js");
const axios = require("axios");
module.exports = {
    name: "play",
    description: "Add a song to the queue",
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    run: async (client, message, args) => {
        let voiceChannell = message.guild.me?.voice.channel;
        let userVoiceChannel = message.author.voice.channel;
        let song = args.join(" ");
        if (!song) {
            return message.channel.send("You need to provide a song to play.");
        }
        if (voiceChannell) {
            if (voiceChannell !== userVoiceChannel) {
                return message.channel.send("You need to be in the same voice channel as the bot to use this command.");
            }
        }
        client.music.play(message.guild.id, song);
    }
}