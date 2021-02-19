module.exports = {
  name: "ping",
  desc: "Gets Api and Bots Ping",
  category: "Information",
  usage: "ping",
  flag: "**None**",
  async execute(bot, message, args, MessageEmbed) {
    let botMsg = await message.channel.send("〽️ Pining");

    const embed = new MessageEmbed()
      .setAuthor(bot.user.tag, bot.user.avatarURL())
      .setThumbnail(bot.user.avatarURL())
      .setTitle("Ping")
      .setTimestamp(message.createdTimestamp)
      .addField(
        "Bots Ping",
        `🏓${Math.round(botMsg.createdAt - message.createdAt)}ms!🏓`
      )
      .addField("API Ping", `🏓${Math.round(bot.ws.ping)}ms!🏓`)
      .setFooter(
        `Requested By: ${message.author.tag}`,
        message.author.avatarURL()
      )
      .setColor("RANDOM");

    botMsg.edit(" ", embed);
  },
};
