class InvalidJsonException extends Error {
    constructor(json) {
        super("Invalid Json");
    }
}

module.exports = InvalidJsonException;