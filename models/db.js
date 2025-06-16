const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000 // tempo máximo em que a pool tentará obter uma conexão antes de lançar um erro
        }
    }
);

// teste de conexão com a base de dados
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}
)();

const db = {};
db.sequelize = sequelize;

// models
db.users = require('./users.model.js')(sequelize, Sequelize.DataTypes); 
db.lodgings = require('./lodgings.model.js')(sequelize, Sequelize.DataTypes); 

// relações
// 1:N
db.users.hasMany(db.lodgings, {foreignKey: 'userID', onDelete: 'CASCADE', allowNull: false});
db.lodgings.belongsTo(db.users, { foreignKey: 'userID', as: 'creator',  onDelete: 'CASCADE', allowNull: false});

module.exports = db;