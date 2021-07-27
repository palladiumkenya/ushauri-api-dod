const sequelize = require("../db_config");
const Sequelize = require("sequelize");

const Unit = sequelize.sequelize.define('tbl_unit', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        service_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'tbl_partner',
                key: 'id'
            }
        },
        unit_name: {
            type: Sequelize.STRING(255),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'tbl_unit',
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
            {
                name: "service_id",
                using: "BTREE",
                fields: [
                    { name: "service_id" },
                ]
            },
        ]
    })

exports.Unit = Unit