
exports.isBlank = function (valer) {
    if (valer === null || valer === undefined || valer === '')
        return true;
    else
        return false;
}

exports.parseInt = function (val) {
    var parsed = parseInt(val);
    return isNaN(parsed) ? val : parsed;
}