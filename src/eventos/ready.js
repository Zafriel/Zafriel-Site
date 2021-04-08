const mongoose = require("mongoose");
const { Collection, MessageEmbed } = require("discord.js");

module.exports.run = (client) => {
  client.commands = new Collection(); //cria loc
  client.aliases = new Collection();

  mongoose
    .connect(`${process.env.MONGOURI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Conectado ao MongoDB");
    })
    .catch((err) => {
      console.log(`Deu erro: ${err}`);
    });

  require("../handler.js")(client); //executa a handler


  client.user.setActivity(`🕵️ | Verificando os Votos do Zafriel`, {
    type: "PLAYING",
  });
  client.user.setStatus("idle");

};
