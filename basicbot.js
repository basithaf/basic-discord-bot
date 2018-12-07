var discord = require("discord.io"),
    logger = require("winston"),
    auth = require("./auth.json");

// Setup the logger
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });
logger.level = "debug"

// Instantiate the bot
var bot = new discord.Client({
    token: auth.token,
    autorun: true
});

// log once the bot is ready to go
bot.on("ready", function(evt){
    logger.info("Connected");
    logger.info("Logged in as: ");
    logger.info(bot.username + " - (" + bot.id + ")");
});

// Respond to messages
bot.on("message", function(user, userID, channelID, message, evt){
    // Look for messages starting with '!'
    if (message.substring(0,1) === "!") {
        let args = message.substring(1).split(" ");
        let command = args[0];

        args = args.splice(1);

        switch(command) {
            case "hi":
                bot.sendMessage({ 
                    to: channelID, 
                    message: "Hello!"
                });
                break;
        }
    }
});
