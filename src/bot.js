const { token, prefix } = require("../settings/config");

const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js");

const fs = require("fs");

const ms = require("ms");

const bot = new Discord.Client();

bot.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./src/commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  console.log(`Loaded Command: ${command.name}`);

  bot.commands.set(command.name, command);
}

bot.login(token);

bot.on("ready", async () => {
  console.log(`Bot: ${bot.user.tag} is Ready!`);
});

bot.on("message", async (message) => {
  if (message.author.bot) return;
  const args = message.content.substring(prefix.length).split(" ");

  if (!message.content.startsWith(prefix)) return;
  switch (args[0]) {
    case "hello":
      //   message.reply("Hi");
      bot.commands.get("hello").execute(message);
      break;
    case "ping":
      bot.commands.get("ping").execute(bot, message, MessageEmbed);
      break;
  }
});
