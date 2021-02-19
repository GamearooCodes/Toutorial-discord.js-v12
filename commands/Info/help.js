module.exports = {
  name: "help",
  desc: "Gets The Help Command",
  category: "Information",
  usage: "help",
  flag: "**Timed**",
  async execute(bot, message, args, MessageEmbed) {
    var command = args[1];
    if (!command) command = "help";
    var name;
    let embed = new MessageEmbed().setTimestamp().setColor("RANDOM");

    switch (command.toLowerCase()) {
      case "mod":
        name = bot.commands
          .filter((cmd) => cmd.category === "Moderation")
          .map((cmd) => `Command: \`\`${bot.config.prefix + cmd.name}\`\``)
          .join("\n\n");
        embed.setTitle("Moderation Commands");
        embed.setDescription(name);
        message.channel.send(embed);
        break;
      case "config":
        name = bot.commands
          .filter((cmd) => cmd.category === "Configuration")
          .map((cmd) => `Command: \`\`${bot.config.prefix + cmd.name}\`\``)
          .join("\n\n");
        embed.setTitle("Configuration Commands");
        embed.setDescription(name);
        message.channel.send(embed);
        break;
      case "info":
        name = bot.commands
          .filter((cmd) => cmd.category === "Information")
          .map((cmd) => `Command: \`\`${bot.config.prefix + cmd.name}\`\``)
          .join("\n\n");
        embed.setTitle("Information Commands");
        embed.setDescription(name);
        message.channel.send(embed);
        break;
      case "misc":
        name = bot.commands
          .filter((cmd) => cmd.category === "Miscellaneous")
          .map((cmd) => `Command: \`\`${bot.config.prefix + cmd.name}\`\``)
          .join("\n\n");
        embed.setTitle("Miscellaneous Commands");
        embed.setDescription(name);
        message.channel.send(embed);
        break;
      default:
        embed.setTitle(`**${bot.user.username}** Commands`);
        embed.setDescription(`${bot.config.prefix}help <command or category>`);
        embed.addField(
          "**Moderation**",
          `\`\`${bot.config.prefix}help mod\`\``,
          true
        );
        embed.addField(
          "**Configuration**",
          `\`\`${bot.config.prefix}help config\`\``,
          true
        );
        embed.addField(
          "**Information**",
          `\`\`${bot.config.prefix}help info\`\``,
          true
        );
        embed.addField(
          "**Miscellaneous**",
          `\`\`${bot.config.prefix}help misc\`\``,
          true
        );
        message.channel.send(embed);
        break;
      case "ping":
        name = bot.commands
          .filter((cmd) => cmd.name === "ping")
          .map((cmd) => `Description: \`\`${cmd.desc}\`\``)
          .join("\n\n");
        embed.setTitle("Ping Command");
        embed.setDescription(name);
        message.channel.send(embed);
        break;
    }
  },
};
