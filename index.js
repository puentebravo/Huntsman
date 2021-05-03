const puppeteer = require("puppeteer");
const config = require("./config.json");
const sites = require("./sites.json");
const { pingSite } = require("./src/pingsite");
const Discord = require("discord.js");
const client = new Discord.Client();
require('dotenv').config();

console.log("this got here")
const deploy = async () => {
  const browser = await puppeteer.launch(config);
  const page = await browser.newPage();

  console.log("Initiating Search...");

  try {
    for (let index = 0; index < sites.length; index += 1) {
      await pingSite(sites[index], page);
    }
  } finally {
    await browser.close();
  }
};


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag} and ready to hunt.`)
});

client.on("message", msg => {
  if (msg.content === "!hunt") {
    deploy()
  }
})

client.login("token")


// module.exports = deploy
