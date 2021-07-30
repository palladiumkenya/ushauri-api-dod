const sequelize = require("../db_config");
const Sequelize = require("sequelize");
const Joi = require("joi");
const {
    Appointment
} = require("./appointment");
const Client = sequelize.sequelize.define(
    'tbl_client', {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "Primary key "
        },
        group_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: "Foreign key to table group",
            references: {
                model: 'tbl_groups',
                key: 'id'
            }
        },
        language_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 1,
            comment: "Foreign key to table language",
            references: {
                model: 'tbl_language',
                key: 'id'
            }
        },
        facility_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        clinic_number: {
            type: Sequelize.STRING(40),
            allowNull: true,
            comment: "used to form the  compound key for each client",
            unique: "clinic_number"
        },
        db_source: {
            type: Sequelize.STRING(15),
            allowNull: true
        },
        ushauri_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        f_name: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        m_name: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        l_name: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        dob: {
            type: Sequelize.STRING(15),
            allowNull: true
        },
        client_status: {
            type: Sequelize.ENUM('ART', 'On Care', 'Pre-ART', 'No Condition'),
            allowNull: true,
            defaultValue: "ART"
        },
        txt_frequency: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 168,
            comment: "how frequenct should we check up on our client by default it's 168 ( whic is 1 week) "
        },
        txt_time: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: "foreign key to table time"
        },
        phone_no: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: "phone used to text the client"
        },
        alt_phone_no: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        shared_no_name: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        smsenable: {
            type: Sequelize.ENUM('Yes', 'No'),
            allowNull: true,
            comment: "conent field for either client has accepted to receive messages "
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
            type: Sequelize.ENUM('Active', 'Dead', 'Disabled', 'Deceased', 'Self Transfer', 'Transfer Out', 'LTFU'),
            allowNull: true,
            defaultValue: "Active"
        },
        partner_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'tbl_partner',
                key: 'id'
            }
        },
        mfl_code: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: "foreign key to the master facility table ",
            references: {
                model: 'tbl_master_facility',
                key: 'code'
            }
        },
        gender: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'tbl_gender',
                key: 'id'
            }
        },
        marital: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'tbl_marital_status',
                key: 'id'
            }
        },
        enrollment_date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        art_date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        wellness_enable: {
            type: Sequelize.ENUM('Yes', 'No'),
            allowNull: true
        },
        motivational_enable: {
            type: Sequelize.ENUM('Yes', 'No', ''),
            allowNull: true
        },
        client_type: {
            type: Sequelize.ENUM('New', 'Transfer', 'Self Transfer', 'Transfer In', 'Transfer Out'),
            allowNull: true
        },
        age_group: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        birth_date: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        created_by: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        updated_by: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        prev_clinic: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        transfer_date: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        entry_point: {
            type: Sequelize.ENUM('Web', 'Mobile', 'EMR', 'ADT', 'IL', ''),
            allowNull: true
        },
        welcome_sent: {
            type: Sequelize.ENUM('Yes', 'No'),
            allowNull: true,
            defaultValue: "No"
        },
        stable: {
            type: Sequelize.ENUM('Yes', 'No', 'Stable', 'Un Stable'),
            allowNull: true,
            defaultValue: "Yes"
        },
        physical_address: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        consent_date: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        DEATH_DATE: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        PATIENT_SOURCE: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        SENDING_APPLICATION: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        clnd_dob: {
            type: Sequelize.STRING(15),
            allowNull: true
        },
        clinic_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 1,
            comment: "foreign key for table clinic",
            references: {
                model: 'tbl_clinic',
                key: 'id'
            }
        },
        national_id: {
            type: Sequelize.STRING(15),
            allowNull: true
        },
        file_no: {
            type: Sequelize.STRING(15),
            allowNull: true
        },
        buddy_phone_no: {
            type: Sequelize.STRING(15),
            allowNull: true
        },
        date_deceased: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        deleted_at: {
            type: Sequelize.DATE,
            allowNull: true
        },
        hei_no: {
            type: Sequelize.STRING(25),
            allowNull: true,
            references: {
                model: 'tbl_pmtct',
                key: 'hei_no'
            }
        }
    }, {
        sequelize,
        tableName: 'tbl_client',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "id"},
                ]
            },
            {
                name: "clinic_number",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "clinic_number"},
                ]
            },
            {
                name: "group_id",
                using: "BTREE",
                fields: [
                    {name: "group_id"},
                ]
            },
            {
                name: "language_id",
                using: "BTREE",
                fields: [
                    {name: "language_id"},
                ]
            },
            {
                name: "gender",
                using: "BTREE",
                fields: [
                    {name: "gender"},
                ]
            },
            {
                name: "marital",
                using: "BTREE",
                fields: [
                    {name: "marital"},
                ]
            },
            {
                name: "date_added",
                using: "BTREE",
                fields: [
                    {name: "created_at"},
                ]
            },
            {
                name: "mfl_code",
                using: "BTREE",
                fields: [
                    {name: "mfl_code"},
                ]
            },
            {
                name: "clinic_id",
                using: "BTREE",
                fields: [
                    {name: "clinic_id"},
                ]
            },
            {
                name: "tbl_client_partner",
                using: "BTREE",
                fields: [
                    {name: "partner_id"},
                ]
            },
            {
                name: "created_at",
                using: "BTREE",
                fields: [
                    {name: "created_at"},
                ]
            },
            {
                name: "hei_no",
                using: "BTREE",
                fields: [
                    {name: "hei_no"},
                ]
            },
        ]
    }
    );

function validateClient(client) {
    const schema = {
        group_id: Joi.number(),
        mfl_code: Joi.number()
            .min(5)
            .max(5),
        gender: Joi.number().required(),
        marital: Joi.number().required(),
        client_status: Joi.string().required(),
        enrollment_date: Joi.date().required(),
        art_date: Joi.date().required(),
        enable_sms: Joi.string().required(),
        status: Joi.string().required(),
        f_name: Joi.string()
            .min(3)
            .max(10)
            .required(),
        m_name: Joi.string()
            .min(3)
            .max(10),
        l_name: Joi.string()
            .min(3)
            .max(10)
            .required(),
        dob: Joi.date().required(),
        phone_no: Joi.string()
            .max(10)
            .min(10),
        clinic_id: Joi.number()
    };

    return Joi.validate(client, schema);
}

exports.Client = Client;
exports.validateClient = validateClient;