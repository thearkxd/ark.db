const _set = (path, value, obj = undefined) => {
    if (!obj) return undefined;
    const locations = path.split(".");
    for (var i = 0; i < locations.length - 1; i++) {
        if (!obj[locations[i]]) obj = obj[locations[i]] = {};
        else obj = obj[locations[i]];
    }
    obj[locations[locations.length - 1]] = value;
    return obj;
};

const _get = (path, obj = {}) => {
    const locations = path.split(".");
    for (var i = 0; i < locations.length - 1; i++) {
        obj = obj[locations[i]] ? obj[locations[i]] : undefined;
        if (!obj) return undefined;
    }
    return obj[locations[locations.length - 1]];
};

module.exports = { _set, _get };