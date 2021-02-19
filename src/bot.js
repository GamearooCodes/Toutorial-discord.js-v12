const { token, prefix } = require("../settings/config");

const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js");

const fs = require("fs");

const ms = require("ms");

const bot = new Discord.Client();
bot.login(token);

bot.on("ready", async () => {
  console.log(`Bot: ${bot.user.tag} is Ready!`);
  //i added this for my panel to read its online its not require
  console.log("Bot Has Started!");
});

bot.on('message', async message => {
    if (message.author.bot) return;
    const args = message.content.substring(prefix.length).split(" ");

    if (!message.content.startsWith(prefix)) return;
    switch(args[0]) {
        case "hello":
            message.reply("Hi");
        break;   
    }
})
