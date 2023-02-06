'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'Users',
          key: 'id'
        },
        onDelete : 'CASCADE'
      },
      albumId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'Albums',
          key: 'id'
        },
        onDelete : 'CASCADE'
      },
      title: {
        type: Sequelize.STRING(30),
        allowNull : false
      },
      description: {
        type: Sequelize.STRING(150),

      },
      url: {
        type: Sequelize.STRING,
        allowNull : false
      },
      previewImage: {
        type: Sequelize.STRING,
        allowNull: true,
        
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
    await queryInterface.dropTable('Songs');
  }
};
