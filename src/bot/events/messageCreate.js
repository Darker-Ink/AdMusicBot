const {client} = require("../index.js");
const prefix = process.env.prefix;

client.on("messageCreate", async (message) => {
    
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd)

    if (!command) return;

    try {
        command.run(client, message, args);
    } catch (error) {
        message.reply(`There was an error trying to execute that command: ${error.message}`);
    }
})