const moment = require("moment");
module.exports = {
  name: "userinfo",
  desc: "Gets a users information",
  category: "Information",
  usage: "userinfo [user]",
  flag: "**None**",
  async execute(bot, message, args, MessageEmbed) {
    let iUser =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.cache.get(args[1]) ||
      message.author;

    const member = message.guild.members.cache.get(iUser.id);
    if (!iUser)
      return message.channel.send(
        "Error! Contact Bot developer or Member Not found or doesn't exists!"
      );

    if (!member)
      return message.reply(
        "Error! Contact Bot developer or Member Not found or doesn't exists!"
      );

    var b = "null";
    var role11 =
      member.roles.cache.find((r) => r.name === "Server Booster") ||
      member.roles.cache.find((r) => r.name === "Anime VIP");
    if (role11) b = "True";
    if (!role11) b = "False";

    const embed = new MessageEmbed()
      .setFooter(
        `Requested By: ${message.author.tag}`,
        message.author.avatarURL({ dynamic: true })
      )
      .setColor("RANDOM")
      .setTitle("User Info")
      .addField("Name:", member, true)
      .addField("Tag:", member.user.tag, true)
      .setTimestamp()
      .addField("Id:", member.id, true)
      .addField(
        "Nickname:",
        `${
          member.nickname !== null
            ? `${member.nickname}`
            : "No Nickname found on user!"
        }`,
        true
      )
      .addField("Status:", member.presence.status, true)
      .addField("Is Server Booster:", b, true)
      .addField(
        "Join Date:",
        `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`,
        true
      )
      .addField(
        "Joined Discord:",
        `${moment
          .utc(member.user.createdAt)
          .format("dddd, MMMM Do YYYY, HH:mm:ss")}`,
        true
      )
      .addField("Is Bot:", `${member.user.bot}`, true)
      .addField("Rank:", member.roles.highest.name, true)
      .addField(
        "Roles:",
        `${
          member.roles ? member.roles.cache.map((r) => `${r}`).join(" | ") : ""
        }`,
        false
      )

      .setThumbnail(member.user.avatarURL({ dynamic: true }));

    message.channel.send(embed);
  },
};
