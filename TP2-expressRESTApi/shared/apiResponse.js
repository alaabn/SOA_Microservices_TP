const { FAILED } = require('../constants/status');

/**
 *
 * @param {*} message
 * @param {*} status
 * @param {*} data
 * @param {*} statusCode
 * @returns
 */
module.exports = (message, status, statusCode, dataOrErr) => {
    return {
        message,
        status,
        code: statusCode,
        ...dataOrErr
    };
};