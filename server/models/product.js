'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category)
    }
  }
  Product.init({
    name: {
       type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Name is required",
					},
					notEmpty: {
						msg: "Name is required",
					},
				},
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price is required",
        },
        notEmpty: {
          msg: "Price is required",
        },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Stock is required",
        },
        notEmpty: {
          msg: "Stock is required",
        },
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Category is required",
        },
        notEmpty: {
          msg: "category is required",
        },
      },
    },
    size: {
       type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Size is required",
					},
					notEmpty: {
						msg: "Size is required",
					},
				},
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};