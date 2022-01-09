require("dotenv").config();

const chalk = require("chalk");
const { Collection } = require("@discordjs/collection");
const fs = require("fs");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.routess = new Collection()
global.SERVER_DIR = __dirname;

const RouteFiles = fs
    .readdirSync(SERVER_DIR + "/routes/")
    .filter((file) => file.endsWith(".js"));

for (const file of RouteFiles) {
    let route = require(`${SERVER_DIR}/routes/${file}`);

    app.routess.set(route.name, route);
    console.log(chalk.yellow("[Route]") + " " + chalk.cyan(route.name) + " loaded!");
}

app.all("*", (req, res) => {
    
    if (!req.headers["user-agent"]) {
        return res.status(500).json({
            message: "Unknown error has occured"
        });
    }

    let type = req.method.toLowerCase();
    let path = req.path.toLowerCase();
    let route = app.routess.get(path);
    if (route) {
        if (route.type === type) {
            route.run(req, res);
        } else {
            res.status(400).json({
                message: "Invalid request type"
            });
        }
    } else {
        res.status(404).json({
            message: "Route not found"
        });
    }
})

app.listen(process.env.port, () => {
    console.log(chalk.green("[Server]") + chalk.cyan(" Listening on port ") + chalk.yellow(process.env.port));
})