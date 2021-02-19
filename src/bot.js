const { token, prefix, version } = require("../settings/config");

const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js");

const fs = require("fs");

const ms = require("ms");

const bot = new Discord.Client();

bot.commands = new Discord.Collection();

["command"].forEach((handler) => {
  require(`./utils/${handler}`)(bot);
});

bot.login(token);

bot.on("ready", async () => {
  console.log(`Bot: ${bot.user.tag} is Ready!`);
});

bot.on("message", async (message) => {
  if (message.author.bot) return;
  const args = message.content.substring(prefix.length).split(" ");

  bot.config = {
    prefix: prefix,
    version: version,
  };

  if (!message.content.startsWith(prefix.toLowerCase())) return;

  const cmd = args[0];
  const command = bot.commands.get(cmd.toLowerCase());
  if (!command) return;
  command.execute(bot, message, args, MessageEmbed);
});
