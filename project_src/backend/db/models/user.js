'use strict';
const {Model, Validator } = require('sequelize');
const { buildError } = require('../../utils/errorBuild.js');



const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      User.hasMany(
        models.Album,
      {
        foreignKey : 'userId', onDelete : 'CASCADE', hooks : true
      }
      );

      User.hasMany(
        models.Song,
        {
          foreignKey : 'userId', onDelete : 'CASCADE', hooks : true
        }
      );

      User.hasMany(
        models.Comment,
        {
          foreignKey : 'userId', onDelete : 'cascade', hooks: true
        }
      );

      User.hasMany(
        models.Playlist,
        {
          foreignKey : 'userId', onDelete : 'cascade', hooks: true
        }
      )
    }
    toSafeObject() {
      const {id, username, email, firstName, lastName, profile_picture, profile_cover} = this; //!context of User instance.
      return {id, username, email, firstName, lastName, profile_picture, profile_cover };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id){
      return User.scope('currentUser').findByPk(id);
    }

    static async login({credential, password}){
      const {Op} = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where : {
          [Op.or] : {
            username : credential,
            email: credential
          }
        }
      });
      if(user && user.validatePassword(password)){
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({firstName, lastName, username, email, password}){
      const {Op} = require('sequelize');
      const hashedPassword = bcrypt.hashSync(password);
      const checkUnique = await User.scope('loginUser').findAll({
        where: {
          [Op.or]:[
            {email : email},
            {username : username}
          ]
        }
      })
      // console.log('--------------',checkUnique);
      if(checkUnique){
        for(let i = 0; i < checkUnique.length; i++){
          let el = checkUnique[i];
          if(el.dataValues.email === email){
            const err = buildError('There is already an account registered with that email','Email already registered', 403);
            return err;
          }
          if(el.dataValues.username === username){
            const err = buildError('There is already an account registered with that username','Username already registered', 403);
            return err;
          }
        }
      }

        const user = await User.create({
          firstName,
          lastName,
          username,
          email,
          hashedPassword
        });
        return await User.scope('currentUser').findByPk(user.id);


    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        len : [1, 30],
        isAlpha: true
      }
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        len : [1, 30],
        isAlpha: true
      }
    },
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
    profile_picture: {
      type: DataTypes.STRING,
      allowNull : true,
      defaultValue : 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675554127015.png'
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
    },
    profile_cover:{
      type: DataTypes.STRING,
      allowNull : true,
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
