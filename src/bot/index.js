require("dotenv").config();
const { Client, Collection } = require('discord.js');
const Distube = require("distube");
const { SpotifyPlugin } = require("@distube/spotify")
const chalk = require('chalk');
const fs = require('fs');

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_VOICE_STATES',
        'GUILD_MESSAGES'
    ],
    allowedMentions: {
        parse: ['users', 'roles'],
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.music = new Distube.default(client, {
    searchSongs: 1,
    emitNewSongOnly: true,
    plugins: [new SpotifyPlugin({
        emitEventsAfterFetching: true,
    })],
    leaveOnFinish: false,
    leaveOnEmpty: false,
    leaveOnStop: false,
    nsfw: true,
    youtubeCookie: process.env.cookie,
});

client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
module.exports.client = client;
global.BOT_DIR = __dirname;

const commandFiles = fs
    .readdirSync(BOT_DIR + "/commands/")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    let command = require(`${BOT_DIR}/commands/${file}`);

    client.commands.set(command.name, command);
    console.log(chalk.yellow("[Command]") + " " + chalk.cyan(command.name) + " loaded!");
}


const events = fs.readdirSync(BOT_DIR + "/events/").filter((file) => file.endsWith(".js"));

events.forEach((file) => {
    const event = require(`${BOT_DIR}/events/${file}`);
    console.log(chalk.yellow("[Event]") + " " + chalk.cyan(file) + " loaded!");
});

client.on("ready", () => {
    console.log(chalk.yellow("[Client]") + " " + chalk.cyan("Ready! " + client.user.tag));
    client.user.setActivity("Music", {
        type: "LISTENING"
    });
})


client.music.on("playSong", (queue, song) => {
    if(queue.textChannel) {
        queue.textChannel.send(`Now playing: ${song.name}`);
    } else {
        return console.log(`Now Playing: ${song.name}`)
    }
})


client.login(process.env.TOKEN);

