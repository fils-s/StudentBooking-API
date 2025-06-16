module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('users', {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Username cannot be empty or null!" }
      }
    },
    password: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
      validate: {
        notNull: { msg: "Password cannot be empty or null!" }
      }
    },
    userType: {
      type: DataTypes.ENUM('student', 'facilitator', 'admin'),
      defaultValue: 'student',
      validate: {
        isIn: {
          args: [['student', 'facilitator', 'admin']],
          msg: "Allowed types of users: Student, Facilitator, Admin"
        }
      }
    },
    email: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Phone number cannot be empty or null!" }
      }
    },
    approval: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        validate: {
            isBoolean: function(value) {
               if (typeof value !== 'boolean') {
                  throw new Error('Approval must be a boolean value.');
               }
            }
         }
      }
    },
    banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        validate: {
            isBoolean: function(value) {
               if (typeof value !== 'boolean') {
                  throw new Error('Banned must be a boolean value.');
               }
            }
         }
      }
    },

  }, {
    timestamps: false
  });

  return User;
};
