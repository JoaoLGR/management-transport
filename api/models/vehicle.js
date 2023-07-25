const Sequelize = require("sequelize");
const database = require("./database");

const VehicleModel = database.define("vehicles", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  vehicle_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  vehicle_type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  max_wheight: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

VehicleModel.sync();

module.exports = VehicleModel;
