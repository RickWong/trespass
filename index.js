const createWrapper = (terminator = '$') => {
    const handler = {
        get(object, key) {
            if (key === terminator) {
                return object instanceof Object
                    ? object[key]
                    : object;
            }

            return wrap(object[key], terminator);
        },
        apply(object, context, args) {
            return wrap(object.apply(context, args), terminator);
        },
        has(object, key) {
            return key in object.$;
        },
        deleteProperty(object, key) {
            delete object.$[key];
        },
    };

    const wrap = (value) => {
        if (typeof value === 'function') {
            return Object.assign(new Proxy(value, handler), {[terminator]: value});
        }

        return value instanceof Object
            ? new Proxy(Object.assign(function() {}, value, {[terminator]: value}), handler)
            : new Proxy(Object.assign(function() {}, {[terminator]: value}), handler);
    };

    return wrap;
};

const defaultWrapper = createWrapper('$');

module.exports = defaultWrapper;
module.exports.default = defaultWrapper;
module.exports.createWrapper = createWrapper;
