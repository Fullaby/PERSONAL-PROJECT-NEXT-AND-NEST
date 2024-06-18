'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "First name is required",
					},
					notEmpty: {
						msg: "First name is required",
					},
				},
    },
    lastName: {
       type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Last name is required",
					},
					notEmpty: {
						msg: "Last name is required",
					},
				},
    },
    email: {
       type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
          isEmail: {
						msg: "Use email format",
					},
					notNull: {
						msg: "Email is required",
					},
					notEmpty: {
						msg: "Email is required",
					},
				},
    },
    password: {
       type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Password is required",
					},
					notEmpty: {
						msg: "Password is required",
					},
				},
    },
    role: {
       type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Role is required",
					},
					notEmpty: {
						msg: "Role is required",
					},
				},
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};