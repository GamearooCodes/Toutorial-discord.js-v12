const kiss = require("random-kiss");

module.exports = {
  name: "kiss",
  desc: "Kiss Someone",
  category: "Miscellaneous",
  usage: "kiss [user]",
  flag: "**None**",
  async execute(bot, message, args, MessageEmbed) {
    let KUser =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.cache.get(args[1]) ||
      message.author;

    const Kissembed = new MessageEmbed()
      .setFooter(
        `Requested By: ${message.author.tag}`,
        message.author.avatarURL()
      )
      .setColor("RANDOM")
      .setDescription(kiss.message(message.author, KUser))
      .setImage(kiss.imageurl)
      .setTimestamp();

    await message.channel.send(Kissembed);
  },
};
