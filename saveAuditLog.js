module.exports = function (action, db, model, options, req) {
    const  { Audits } = db;
    let id = null;
    try {
        id = req.user.dataValues.id;
    } catch (e) {
        id = null;
    }

    if (action == 'delete') {
        Audits.create({
            userId: id,
            actionType: action,
            table: model.model.name,
            prevValues: "{}",
            newValues: JSON.stringify(model.where),
        });
    }
    else if (!model.dataValues.table) {
        Audits.create({
            userId: id,
            actionType: action,
            table: model._modelOptions.name.plural,
            prevValues: JSON.stringify(model._previousDataValues),
            newValues: JSON.stringify(model.dataValues),
        });
    }
}