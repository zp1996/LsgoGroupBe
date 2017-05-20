exports.BaseGet = field => {
    return function() {
        return this.getDataValue(field);
    };
};

const getErrorMsg = msg => ({
    status: 400,
    msg
});
exports.getErrorMsg = getErrorMsg;

exports.getAllRows = (rows, attrs) => {
    const res = [];
    for (let row of rows) {
        res.push(
            attrs.reduce((data, attr) => {
                return Object.assign(data, {
                    [attr]: row[attr]
                });
            }, {})
        );
    }
    return res;
};

exports.BaseDelete = (model, msg) => async id => {
    let err = null;
    const row = await model.update({
        status: 0
    }, { where: { id } });
    Boolean(row[0]) || (err = getErrorMsg(msg));
    return err;
};
