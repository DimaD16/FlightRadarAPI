/**
 * Exception raised when an airport is not found.
 */
class AirportNotFoundError extends Error {
    /**
     * @param {string} message
     */
    constructor(message) {
        super(message);

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Exception raised when Cloudflare blocks the request.
 */
class CloudflareError extends Error {
    /**
     * @param {string} message
     * @param {object} response
     */
    constructor(message, response) {
        super(message);

        this.name = this.constructor.name;
        this.response = response;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Exception raised when login fails.
 */
class LoginError extends Error {
    /**
     * @param {string} message
     */
    constructor(message) {
        super(message);

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {AirportNotFoundError, CloudflareError, LoginError};
