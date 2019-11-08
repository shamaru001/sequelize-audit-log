const path = require('path');
const _ = require('lodash');

module.exports = function (db, saveAuditLog) {
    return (req, res, next) => {
        const { sequelize } = db;
        const hooks = {
            afterCreate: (instance, options) => {
                saveAuditLog('create', db, instance, options, req)
            },
            afterUpdate: (instance, options) => {
                saveAuditLog('update', db, instance, options, req);
            },
            afterBulkDestroy: (instance, options) => {
                saveAuditLog('delete', db, instance, options, req);
            }
        }
        const model = sequelize['import'](path.join(__dirname, 'audit.js'));
        db[model.name] = model;
        sequelize.options.hooks = hooks;
        next();
    }
};