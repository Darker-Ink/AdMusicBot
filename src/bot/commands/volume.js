const { Message, Client } = require("discord.js");
const axios = require("axios");
module.exports = {
    name: "volume",
    description: "Change the volume of the current song",
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    run: async (client, message, args) => {
        let queue = client.music.getQueue(message.guild.id);
        let voiceChannell = guildObj.me?.voice.channel;
        let userVoiceChannel = userObj.voice.channel;
        let isNum = !isNaN(args[0]);
        if (!queue) {
            return message.channel.send("There is nothing playing.");
        }
        if (voiceChannell !== userVoiceChannel) {
            return message.channel.send("You need to be in the same voice channel as the bot to use this command.");
        }
        if (!isNum) {
            return message.channel.send("Please enter a valid number.");
        }

        let volume = parseInt(args[0]);

        if (volume >= 0 && volume <= 100) {
            client.music.setVolume(message.guild.id, volume);
            message.channel.send("The volume has been set to " + volume + ".");
        } else {
            message.channel.send("Please enter a number between 0 and 100.");
        }

    }
}