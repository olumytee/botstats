# botstats

npm install botstats --save

// obtain token from https://alpha.botstats.co

const token = process.env.BOTSATS_TOKEN || "really-long-token"

const botstats = require('botstats')(token)

// assuming your bot is initialized like this
var bot = new builder.UniversalBot(connector)

// tell bot to use botstats
bot.use(botstats)