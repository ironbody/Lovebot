const Discord = require("discord.js");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync("./config.json"));

const discordClient = new Discord.Client();

function getRandomSentence() {
  let random = Math.floor(Math.random() * config.sentences.length);
  return config.sentences[random];
}

discordClient.once("ready", () => {
  console.log("Up and running!");
});

discordClient.on("message", async message => {
  if (message.content == config.command) {
    let sentence = getRandomSentence();
    message.channel.send(`${message.author} ${sentence}`);
  }
});

discordClient.login(config.apiKey);