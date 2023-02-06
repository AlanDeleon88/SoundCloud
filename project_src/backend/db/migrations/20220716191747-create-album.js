'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Albums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : 'Users',
          key: 'id'
        },
        onDelete : 'CASCADE'
      },
      title: {
        type: Sequelize.STRING(30),
        allowNull : false
      },
      previewImage: {
        type: Sequelize.STRING,
        allowNull : true,
        defaultValue : 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675554811745.png'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Albums');
  }
};
