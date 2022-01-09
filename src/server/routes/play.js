const { Request, Response } = require("express");
const {client} = require("../../bot/index");

module.exports = {
    name: "/api/play",
    type: "post",
    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    run: async (req, res) => {
        let body = req.body;
        let { user, guild, channel, song } = body;
        
        let guildObj = client.guilds.cache.get(guild);
        let userObj = client.users.cache.get(user);
        
        if (!guildObj) {
            return res.status(400).json({
                message: "Guild not found"
            });
        }

        if (!userObj) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        let channelObj = guildObj.channels.cache.get(channel);

        if (!channelObj) {
            return res.status(400).json({
                message: "Channel not found"
            });
        }

        let voiceChannell = guildObj.me?.voice.channel;

        if (voiceChannell) {
            if (voiceChannell.id !== channelObj.id) {
                return res.status(400).json({
                    message: "You're not in the same voice channel"
                });
            }

            client.music.playVoiceChannel(voiceChannell, song, {
                member: userObj,
            })
            return res.status(200).json({
                message: "Song added to queue"
            });
        }


        let channelType = channelObj.type;

        if (channelType !== "GUILD_VOICE") {
            return res.status(400).json({
                message: "Channel is not a voice channel"
            });
        }

        let voiceChannel = channelObj;

        if (!voiceChannel.joinable) {
            return res.status(400).json({
                message: "I can't join this channel"
            });
        }

        client.music.playVoiceChannel(voiceChannel, song, {
            member: userObj,
        });

        return res.status(200).json({
            message: "Playing song"
        });

    }
}




    