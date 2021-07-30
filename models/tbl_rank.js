const Sequelize = require('sequelize');
const sequelize = require("../db_config");

const Rank = sequelize.sequelize.define(
'tbl_rank', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rank_name: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    status: {
      type: Sequelize.ENUM('Active','Disabled'),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbl_rank',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

exports.Rank = Rank;
