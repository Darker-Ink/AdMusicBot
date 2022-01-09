const { Message, Client } = require("discord.js");
const axios = require("axios");
module.exports = {
    name: "resume",
    description: "Resume the current song.",
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    run: async (client, message, args) => {
        let queue = client.music.getQueue(message.guild.id);
        let voiceChannell = guildObj.me?.voice.channel;
        let userVoiceChannel = userObj.voice.channel;

        if (!queue) {
            return message.channel.send("There is nothing playing.");
        }
        if (voiceChannell !== userVoiceChannel) {
            return message.channel.send("You need to be in the same voice channel as the bot to use this command.");
        }
        if (!queue.paused) {
            return message.channel.send("The song is already playing.");
        }
        client.music.resume(message.guild.id);
        message.channel.send("The song has been resumed.");
    }
}