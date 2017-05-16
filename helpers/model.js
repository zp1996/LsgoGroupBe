exports.BaseGet = field => {
    return function() {
        return this.getDataValue(field);
    };
};

exports.getErrorMsg = msg => ({
    status: 400,
    msg
});

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
