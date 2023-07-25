const Sequelize = require("sequelize");
const database = require("./database");

const FreightsModel = database.define("freights", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  product: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  product_wheight: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  vehicle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  vehicle_wheight: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  kms: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  freight: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  rate: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  delivery_value: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

FreightsModel.sync();

module.exports = FreightsModel;
