const Sequelize = require("sequelize");

const sequelize = new Sequelize("crud", "root", "160122", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida!");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao banco de dados:", err);
  });

module.exports = sequelize;
