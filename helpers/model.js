exports.BaseGet = field => {
    return function() {
        return this.getDataValue(field);
    };
};

exports.getErrorMsg = msg => ({
    status: 400,
    msg
});
