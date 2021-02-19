module.exports = {
  name: "hello",
  description: "Get a friendly hello",
  async execute(message) {
    message.reply("Hello How Are You.");
  },
};
