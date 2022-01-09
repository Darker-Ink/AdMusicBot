const { Request, Response } = require("express");
const {client} = require("../../bot/index");

module.exports = {
    name: "/api/queue",
    type: "post",
    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    run: async (req, res) => {
        let body = req.body;
        let { guild } = body;
        
        let songs = {}

        let guildObj = client.guilds.cache.get(guild);
        
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
        queue.songs.slice(0, queue.songs.length).map(song => {
            songs[song.id] = {
                title: song.name,
                url: song.url,
                thumbnail: song.thumbnail,
                duration: song.duration,
                requester: song.member.id,
            }
        })

        return res.status(200).json({
            songs: songs,
            length: queue.songs.length
        });
    }
}