const Sequelize = require("sequelize");
const database = require("./database");

const ProductsModel = database.define("products", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  product_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  product_type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  product_wheight: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

ProductsModel.sync();

module.exports = ProductsModel;
