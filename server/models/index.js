const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const SprMin = sequelize.define('spr_min', {
    id_spr_min: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name_spr_min: {
        type: DataTypes.STRING(1024),
        allowNull: false
    }
}, {
    tableName: 'spr_min',
    timestamps: false
})

const Regions = sequelize.define('regions', {
    id_region: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name_region: {
        type: DataTypes.STRING(1024),
        allowNull: false
    },
    id_fedokrug: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'regions',
    timestamps: false
})

const Fedokrug = sequelize.define('fedokrug', {
    id_fedokrug: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name_fedokrug: {
        type: DataTypes.STRING(1024),
        allowNull: false
    }
}, {
    tableName: 'fedokrug',
    timestamps: false
})

const Orgs = sequelize.define('orgs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    idlistedu: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_parent: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_spr_min: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_rubpnubp: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    id_level: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(2048),
        allowNull: false
    },
    name_abb: {
        type: DataTypes.STRING(2048),
        allowNull: false
    },
    inn: DataTypes.STRING(20),
    kpp: DataTypes.STRING(20),
    id_region: DataTypes.INTEGER,
    address: DataTypes.STRING(2048),
    ogrn: DataTypes.STRING(30),
    date_remove: DataTypes.DATE,
    kod_status_egrul: DataTypes.STRING(2048),
    status_egrul: DataTypes.STRING(2048),
    okpo: DataTypes.STRING(20),
    name_rub: DataTypes.STRING(2048),
    egrul_updated: DataTypes.DATE,
    phone: DataTypes.STRING(1024),
    site: DataTypes.STRING(1024),
    mail: DataTypes.STRING(1024),
    recordnum_rub: DataTypes.STRING(40),
    inn_rub: DataTypes.STRING(40),
    kpp_rub: DataTypes.STRING(40),
    okved: DataTypes.STRING(40),
    date_start_egrul: DataTypes.DATE,
    oktmo: DataTypes.STRING(30),
    okfs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    egrul_uchred: DataTypes.STRING(512),
    isspo: DataTypes.NUMERIC(1, 0),
    disable_egrul: DataTypes.NUMERIC(1, 0),
    kod_status_rub: DataTypes.INTEGER,
    kbkcode: DataTypes.STRING(10),
    kbkname: DataTypes.STRING(2048),
    budgetlvlcode: DataTypes.STRING(10),
    org_type: DataTypes.STRING(50),
    id_givc: DataTypes.INTEGER,
    heads: DataTypes.STRING(2048),
    inclusiondate: DataTypes.DATE,
    shortname: DataTypes.STRING(1024),
    opf_code: DataTypes.STRING(20),
    okfsname: DataTypes.STRING(512),
    kofkcode: DataTypes.STRING(20),
    budgetcode: DataTypes.STRING(30),
    budgetname: DataTypes.STRING(256),
    code_spobul: DataTypes.STRING(10),
    name_spobul: DataTypes.STRING(256),
    is_reorg: DataTypes.NUMERIC(1, 0),
    tz_org: DataTypes.STRING(20),
    ogrn_rub: DataTypes.STRING(30),
    oktmoname: DataTypes.STRING(256),
    org_create_date: DataTypes.DATE
}, {
    tableName: 'orgs',
    timestamps: false
})

Orgs.belongsTo(SprMin, {
    foreignKey: 'id_spr_min',
    as: 'sprMin'
})

Orgs.belongsTo(Regions, {
    foreignKey: 'id_region',
    as: 'region'
})

Regions.belongsTo(Fedokrug, {
    foreignKey: 'id_fedokrug',
    as: 'fedokrug'
})

module.exports = { Orgs, Fedokrug, Regions, SprMin }
