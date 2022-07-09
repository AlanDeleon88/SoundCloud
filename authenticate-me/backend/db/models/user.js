'use strict';
const {
  Model,
  Validator
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
    username:{
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        len : [4, 30],
        isNotEmail(value) {
            if(Validator.isEmail(value)){
              throw new Error('Cannot be an email.');
            }
        }
      }

    },
    email:{
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        len : [3, 256]
      }

    },
    hashedPassword:{
     type : DataTypes.STRING.BINARY,
     allowNull : false,
     validate : {
      len : [60, 60]
     }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope :{ //! default scope to prevent sensitive information being queryed for.
      attributes : {
        exclude : ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes : {
      currentUser : { //! exclude password for querys for current user.
        attributes : {exclude : ["hashedPassword"]}
      },
      loginUser : { //! only used to verify credentials of a user attempting to log in.
        attributes : {}
      }
    }
  });
  return User;
};
