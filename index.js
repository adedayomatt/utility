class Utils {
    /**
     * Check if a value is a string
     *
     * @param {*} value
     * @returns {boolean}
     */
    static _isString(value) {
        return typeof value === "string";
    }

    /**
     * Check if a value is an object
     *
     * @param {*} value
     * @returns {boolean}
     */
    static _isObject(value) {
        return value instanceof Object;
    }

    /**
     * Parse object string to object
     *
     * @param {string} string
     * @returns {{}}
     */
    static _objectFromString(string = "") {
        const validMatch = string.match(/\{.*\}/);
        return validMatch ? JSON.parse(validMatch[0]) : {};
    }
    /**
     * Check if a value is an array
     *
     * @param {*} value
     * @returns {boolean}
     */
    static _isArray(value) {
        return value instanceof Array;
    }

    /**
     * Check if a value is a boolean
     *
     * @param {*} value
     * @returns {boolean}
     */
    static _isBoolean(value) {
        return typeof value === "boolean";
    }


    /**
     * Check if a value is an object or an array
     *
     * @param {*} value
     * @returns {boolean}
     */
    static _isIterable(value) {
        return this._isObject(value) || this._isArray(value)
    }

    /**
     * Get the type a value
     *
     * @param {*} value
     * @returns {string}
     */
    static _getDataType(value) {
        const types = {
            "string": this._isString(value),
            "array": this._isArray(value),
            "object": this._isObject(value),
            "boolean": this._isBoolean(value),
        }
        return Object.keys(types).find(type => types[type] == true);
    }

    /**
     * Sets properties of an object or class
     *
     * @param {object|*} caller
     * @param {{}} properties
     * @returns {*}
     */
    static _set(caller, properties = {}) {
        for(let key in properties) {
            caller[key] = properties[key]
        }
        return caller;
    }

    /**
     * Get a property from an object/class or the default value
     *
     * @param {object|*} caller
     * @param {string} property
     * @param {*} defaultValue
     * @returns {*|null}
     */
    static _get(caller, property = "", defaultValue = null) {
        return caller[property] || defaultValue;
    }

    /**
     * Get multiple properties from an object/class
     *
     * @param {object|*} caller
     * @param {[string]} properties
     * @param {*} defaultValueForEach
     * @returns {{}}
     */
    static _getMany(caller, properties = [], defaultValueForEach = null) {
        const _properties = {};
        properties.forEach(property => {
            _properties[property] = this._get(caller, property, defaultValueForEach)
        })
        return _properties;
    }

    /**
     * Capitalize first letter of a string
     *
     * @param {string} string
     * @returns {string}
     */
    static _capitalizeFirstLetter(string = "") {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    /**
     * Go through each item of an object and apply a callback
     *
     * @param {object} object
     * @param {function} callback
     * @param {string} key
     * @param {string} address
     * @returns {{}|*}
     */
    static _crawlObject(object = {}, callback = (item, key, address) => {}, key = null, address = null) {
        if(!this._isObject(object)){
            return callback(object, key, address);
        }
        for(let key in object) {
            object[key] = this._crawlObject(object[key], callback, key,address ? address+"."+key : key)
        }
        return object;
    }

    /**
     * Get value at an address in an object
     *
     * @param object
     * @param address e.g person.contact.name
     * @param defaultValue
     * @returns {*|null}
     */
    static _getObjectItem(object = {}, address = "", defaultValue = null) {
        const components = address.split(".");
        if(components.length === 1) {
            let component = components[0];
            let value = object[component];
            return value || defaultValue;
        }
        return this._getObjectItem(object[components[0]], components.slice(1).join("."), defaultValue)
    }

    /**
     * Set value to an address of an object, nested  objects are created if the parent point does not exist
     *
     * @param object
     * @param address e.g person.contact.name
     * @param value
     * @returns {{}|{[p: string]: null}}
     */
    static _setObjectItem(object = {}, address = "", value = null) {
        const components = address.split(".");
        if(components.length === 1) {
            return { ...object || {}, [components[0]]: value }
        }
        const parent = components[0];
        let childElement = this._isObject(object[parent]) ? object[parent] : {}
        object[parent] = this._setObjectItem(childElement, components.slice(1).join("."), value)
        return object;
    }
}

module.exports = Utils