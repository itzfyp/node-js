const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'node-complete',
  'root',
  'akilan@J23',
  {
    dialect: 'mysql',
    host: 'localhost'
  }
);

module.exports = sequelize;
