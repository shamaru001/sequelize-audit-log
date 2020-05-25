module.exports = function (action, db, model, options, req, userPk) {
    const  { Audits } = db;
    let id;
    try {
        id = req.user.getDataValue(userPk);
    } catch (e) {
        id = null;
    }

    try {
        if (action == 'delete') {
            Audits.create({
                user: id || null,
                actionType: action,
                table: model.model.name,
                prevValues: "{}",
                newValues: JSON.stringify(model.where),
            });
        }
        else if (!model.dataValues.table) {
            Audits.create({
                user: id,
                actionType: action,
                table: model._modelOptions.name.plural,
                prevValues: JSON.stringify(model._previousDataValues),
                newValues: JSON.stringify(model.dataValues),
            });
        }
    } catch (e) {
        console.error(`Fail to register log for the table ${model.model.name}`)
    }
}
