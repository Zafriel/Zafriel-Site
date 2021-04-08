require("./strategies/discord");
const express = require("express");
const app = express();
const path = require("path");

const client = require("../../index");
const session = require("express-session");
const mongoose = require("mongoose");
const StoreMongo = require("connect-mongo")(session);

const passport = require("passport");
const index = require("./routes/index");

const { Webhook } = require("@top-gg/sdk");

const webhook = new Webhook(process.env.DBL_PASSWORD);

app.post("/dblwebhook", webhook.middleware(), async (req, res) => {
  const { MessageEmbed } = require("discord.js");

  const EMBED = new MessageEmbed()
    .setTitle(`<a:DSL_Topgg:829504601980010516> Voto no Top.gg`)
    .setDescription(
      `**${
        client.users.cache.get(req.vote.user).tag
      }** votou no **Zafriel** no site **[Top.GG](https://top.gg/bot/601847636546289664)**`
    )
    .setFooter(req.vote.user)
    .setTimestamp()
    .setColor("#ff7900")
    .setThumbnail(
      client.users.cache
        .get(req.vote.user)
        .displayAvatarURL({ dynamic: true, format: "jpg", size: 2048 })
    );

  client.channels.cache
    .get("829509960160641025")
    .send(`**${client.users.cache.get(req.vote.user).tag}**`, EMBED);
});

app.post("/vbwebhook", webhook.middleware(), async (req, res) => {
  const { MessageEmbed } = require("discord.js");

  const EMBED = new MessageEmbed()
    .setTitle(`<:void:829507703856562216> Voto no VoidBots`)
    .setDescription(
      `**${
        client.users.cache.get(req.vote.user).tag
      }** votou no **Zafriel** no site **[VoidBots](https://voidbots.net/bot/601847636546289664/vote)**`
    )
    .setFooter(req.vote.user)
    .setTimestamp()
    .setColor("#ff7900")
    .setThumbnail(
      client.users.cache
        .get(req.vote.user)
        .displayAvatarURL({ dynamic: true, format: "jpg", size: 2048 })
    );

  client.channels.cache
    .get("829509935313846344")
    .send(`**${client.users.cache.get(req.vote.user).tag}**`, EMBED);
});

app.use(
  session({
    //Configuração do express-session
    secret: "keyboard cat",
    cookie: {
      maxAge: 60000 * 60 * 24, //tempo do cookie
    },
    resave: false,
    saveUninitialized: false,
    store: new StoreMongo({ mongooseConnection: mongoose.connection }), //pra o store mongo
  })
);

app.use(passport.initialize()); //inicializa o  passport
app.use(passport.session()); //inicializa o session do passport

app.set("views", path.join(__dirname, "/views")); //diretorio de views
app.use(express.static(path.join(__dirname, "/public"))); //diretorio de arquivos estaticos

app.engine("html", require("ejs").renderFile); //coloca ejs renderFile como engine
app.set("view engine", "ejs"); //seta o ejs como view engine

app.use(express.json()); //Pra receber respostas json
app.use(express.urlencoded({ extended: true }));

app.use("/", index); //pasta de rotas

app.listen(process.env.PORT, () => {
  console.log("a dashboard tbm");
}); //liga servidor
