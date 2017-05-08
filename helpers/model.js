exports.getErrorMsg = msg => ({
    status: 400,
    msg
});

exports.BaseGet = field => {
    return function() {
        return this.getDataValue(field);
    };
};
