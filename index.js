const {
  token,
  mongourl,
  prefix,
  version,
  color,
  beta,
  name,
} = require("./config");

const Discord = require("discord.js");

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

const { createLogger, format, transports, level } = require("winston");
const { consoleFormat } = require("winston-console-format");
const util = require("util");

const logger = createLogger({
  level: "silly",
  format: format.combine(
    format.timestamp(),
    format.ms(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "Test" },
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.padLevels(),
        consoleFormat({
          showMeta: true,
          metaStrip: ["timestamp", "service"],
          inspectOptions: {
            depth: Infinity,
            colors: true,
            maxArrayLength: Infinity,
            breakLength: 120,
            compact: Infinity,
          },
        })
      ),
    }),
  ],
});

var figlet = require("figlet");

client.on("ready", async () => {
  const readOutdated = require("package-outdated");
  let check = await readOutdated();

  client.user.setActivity(`s.help | New Bot!`);
  if (beta == true) logger.warn("Starting Bot In Beta Mode!");
  if (beta == false) logger.info("Starting Bot In Normal Mode!");
  if (check) logger.warn(check);
  else logger.info("No Updates Available!");
  figlet(`${client.user.username} Is Ready!`, function (err, data) {
    if (err) {
      logger.warn("Something went wrong...");
      console.dir(err);
      return;
    }

    logger.silly(
      ` ${client.user.tag}\n\n═════════════════════════════════════════════════════════════════════════════ \n ${data} \n ═════════════════════════════════════════════════════════════════════════════`
    );
  });
  logger.info("Bot Has Started!");

  const show = ["dnd", "dnd", "online", "idle"];

  setInterval(async () => {
    const index1 = Math.floor(Math.random() * (show.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
    client.user.setStatus(show[index1]);
    logger.debug(show[index1]); // sets bot's activities to one of the phrases in the arraylist.
  }, 195000);

  setInterval(async () => {
    let servermain = client.guilds.cache.get("605900262581993472");
    let chan = servermain.channels.cache.get("785578487040704582");
    chan.setName(`Rem:  ${client.guilds.cache.size}`);
    let check = await readOutdated();
    if (check) logger.warn(check);
    else logger.info("No Updates Available!");

    const activities_list = [
      `r!help`,
      `r!help`,
      "Bot By: Gamearoo#0001",
      "with some code",
      "with You",
      `version: ${version}`,
      `r!bug [issue] to report bugs`,
      `r!help | New Bot!`,
      `${client.guilds.cache.size} Servers`,
      `Helping ${client.users.cache.size
        .toLocaleString()
        .replace(/,/g, ",")} Users`,
    ];
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
    client.user.setActivity(activities_list[index]);
    logger.verbose(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
  }, 75000);
});

client.login(token);
