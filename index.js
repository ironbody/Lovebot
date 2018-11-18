const Discord = require("discord.js");

const discordClient = new Discord.Client();

let isChecking = false;
let interval;

discordClient.once("ready", () => {
  console.log("Up and running!");
});

discordClient.on("message", async message => {
  if (message.content == "!start" && !isChecking) {
    if (!message.member.roles.some(r => ["admin"].includes(r.name))) {
      return message.channel.send("Nope");
    } else {
      message.channel.send("Starting check");
      isChecking = true;

      interval = setInterval(function() {
        message.channel.send("Check");
      }, 1000);
    }
  } else if (message.content == "!stop" && isChecking) {
    if (!message.member.roles.some(r => ["admin"].includes(r.name))) {
      return message.channel.send("Nope");
    } else {
      message.channel.send("Stopping check");
      isChecking = false;

      clearInterval(interval);
    }
  }
});
