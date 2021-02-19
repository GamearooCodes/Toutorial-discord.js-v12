const { readdirSync } = require("fs");

module.exports = (bot) => {
  readdirSync("./commands/").forEach((dir) => {
    const commands = readdirSync(`./commands/${dir}/`).filter((f) =>
      f.endsWith(".js")
    );
    for (let file of commands) {
      let pull = require(`../../commands/${dir}/${file}`);

      bot.commands.set(pull.name, pull);
      console.log(`Loaded: ${file}`);
    }
  });
};
