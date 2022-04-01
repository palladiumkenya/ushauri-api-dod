const sequelize = require("../db_config");
const Sequelize = require("sequelize");

const myKdod = sequelize.sequelize.define(
    "tbl_kdod_number", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
          requested_date: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
          },
          requested_by: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: "Foreign key to table user",
            references: {
                model: 'tbl_users',
                key: 'facility_id'
            }
           },
          assigned_date: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
          },
          c_status: {
            type: Sequelize.CHAR(2),
            allowNull: false
          },
        kdod_num: {
            type: Sequelize.INTEGER,
            allowNull: true
          }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: "tbl_kdod_number"
    }

)



exports.myKdod = myKdod

