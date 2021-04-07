const express = require('express')
const app = express()

const { Webhook } = require("@top-gg/sdk");

const webhook = new Webhook("LmAl27052004@@");

app.post("/dblwebhook", webhook.middleware(), async (req, res) => {
console.log(req.vote.user)
});