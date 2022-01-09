const { Request, Response } = require("express");
const {client} = require("../../bot/index");

module.exports = {
    name: "/api/shuffle",
    type: "post",
    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    run: async (req, res) => {
        let body = req.body;
        let { user, guild } = body;

        let guildObj = client.guilds.cache.get(guild);
        let userObj = guildObj.members.cache.get(user);

        if (!guildObj) {
            return res.status(400).json({
                message: "Guild not found"
            });
        }

        let queue = client.music.getQueue(guild);

        if (!queue) {
            return res.status(400).json({
                message: "Queue not found"
            });
        }

        let voiceChannell = guildObj.me?.voice.channel;
        let userVoiceChannel = userObj.voice.channel;

        if(!userVoiceChannel) {
            return res.status(400).json({
                message: "User not in voice channel"
            });
        }

        if(!voiceChannell) {
            return res.status(400).json({
                message: "Bot not in voice channel"
            });
        }
        
        if (voiceChannell) {
            if (voiceChannell.id !== userVoiceChannel.id) {
                return res.status(400).json({
                    message: "You're not in the same voice channel"
                });
            }

            client.music.shuffle(voiceChannell);
            return res.status(200).json({
                message: "Shuffled"
            });
        }
    }
}