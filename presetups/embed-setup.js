const embed = new MessageEmbed()
  .setFooter(
    `Requested By: ${message.author.tag}`,
    message.author.avatarURL({ dynamic: true })
  )
  .setColor("RANDOM")
  .setTimestamp();
