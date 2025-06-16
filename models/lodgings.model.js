module.exports = function (sequelize, DataTypes) {
  const Lodging = sequelize.define('lodgings', {
    lodgingID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name cannot be empty or null!" }
      }
    },
    address: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notNull: { msg: "Address cannot be empty or null!" }
      }
    },
    location: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notNull: { msg: "Location cannot be empty or null!" }
      }
    },
    avaliability: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notNull: { msg: "Avaliability cannot be empty or null!" }
      }
    },
    price: {
      type: DataTypes.DECIMAL(8, 2), 
      allowNull: false,
      validate: {
        notNull: { msg: "Price cannot be empty or null!" }
      }
    },
    nBeds: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      validate: {
        notNull: { msg: "Number of Beds cannot be empty or null!" }
      }
    },
    lodgingType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Number of Beds cannot be empty or null!" }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    averageScore: {
      type: DataTypes.DECIMAL(3, 2)
    }

  }, {
    timestamps: false
  });

  return Lodging;
};
