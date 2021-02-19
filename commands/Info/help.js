module.exports = {
  name: "help",
  desc: "Gets The Help Command",
  category: "Information",
  usage: "help",
  flag: "**Timed**",
  async execute(bot, message, args, MessageEmbed) {
    const embed = new MessageEmbed()
      .setFooter(
        `Requested By: ${message.author.tag}`,
        message.author.avatarURL()
      )
      .setDescription(
        `Select the page number you want to view \n 1️⃣ : Configuration \n 2️⃣ : Information \n 3️⃣ : Moderation \n 4️⃣ : Miscellaneous`
      )
      .setColor("RANDOM")
      .setTitle("Help")
      .setAuthor(bot.user.tag, bot.user.avatarURL())
      .setTimestamp();

    let defult = embed.description;
    try {
      var msg = await message.channel.send(embed);
      reacting(msg);
    } catch (error) {
      console.log(error);
    }

    const PRUNING = false;
    const filter = (reaction, user) => user.id != message.client.user.id;
    var collector = msg.createReactionCollector(filter, { time: 120000 });
    collector.on("collect", async (reaction, user) => {
      const member = message.guild.member(user);
      // r!8ball hi
      // r!8ball [question]
      switch (reaction.emoji.name) {
        case "1️⃣":
          react(msg);
          let config = bot.commands
            .filter((cmd) => cmd.category === "Configuration")
            .map(
              (cmd) =>
                `Command: **${bot.config.prefix + cmd.name}** Description: **${
                  cmd.desc
                }** Usage: **${bot.config.prefix + cmd.usage}** Flags: ${
                  cmd.flag
                }`
            )
            .join("\n\n -");

          embed.setTitle(`Configuration Commands`);
          embed.setDescription(config);
          await msg.edit(embed);
          break;
        case "2️⃣":
          react(msg);
          let info = bot.commands
            .filter((cmd) => cmd.category === "Information")
            .map(
              (cmd) =>
                `= Command: **${
                  bot.config.prefix + cmd.name
                }** Description: **${cmd.desc}** Usage: **${
                  bot.config.prefix + cmd.usage
                }** Flags: ${cmd.flag}`
            )
            .join("\n\n");

          embed.setTitle(`Information Commands`);
          embed.setDescription(info);
          await msg.edit(embed);
          break;
        case "3️⃣":
          react(msg);
          let mod = bot.commands
            .filter((cmd) => cmd.category === "Moderation")
            .map(
              (cmd) =>
                `= Command: **${
                  bot.config.prefix + cmd.name
                }** Description: **${cmd.desc}** Usage: **${
                  bot.config.prefix + cmd.usage
                }** Flags: ${cmd.flag}`
            )
            .join("\n\n");

          embed.setTitle(`Moderation Commands`);
          embed.setDescription(mod);
          await msg.edit(embed);
          break;
        case "4️⃣":
          react(msg);
          let misc = bot.commands
            .filter((cmd) => cmd.category === "Miscellaneous")
            .map(
              (cmd) =>
                `= Command: **${
                  bot.config.prefix + cmd.name
                }** Description: **${cmd.desc}** Usage: **${
                  bot.config.prefix + cmd.usage
                }** Flags: ${cmd.flag}`
            )
            .join("\n\n");

          embed.setTitle(`Miscellaneous Commands`);
          embed.setDescription(misc);
          await msg.edit(embed);

          break;
        case "◀️":
          msg.reactions.removeAll().catch(console.error);
          reacting(msg);
          embed.setDescription(defult);
          embed.setTitle("Help");
          await msg.edit(embed);
          break;
        default:
          reaction.users.remove(user).catch(console.error);
          break;
      }
    });
    collector.on("end", () => {
      msg.reactions.removeAll().catch(console.error);
      if (PRUNING && msg && !msg.deleted) {
        msg.delete({ timeout: 3000 }).catch(console.error);
      }
    });
  },
};

async function reacting(message) {
  await message.react("1️⃣");
  await message.react("2️⃣");
  await message.react("3️⃣");
  await message.react("4️⃣");
}

async function react(msg) {
  msg.reactions.removeAll().catch(console.error);
  msg.react("◀️");
}
