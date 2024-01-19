const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { StatusCodes } = require('http-status-codes');
const response = require('../shared/apiResponse');
const status = require('../constants/status');
const createUserSchema = require('../schema/createUserSchema.json');
const updateUserSchema = require('../schema/updateUserSchema.json');

const ajv = new Ajv({
    allErrors: true
});
addFormats(ajv);

ajv.addSchema(createUserSchema, 'user.create');
ajv.addSchema(updateUserSchema, 'user.update');

const validateJsonSchema = (name) => {
    return async (req, res, next) => {
        try {
            const validate = ajv.getSchema(name);
            await validate(req.body);
            next();
        } catch (err) {
            if (err instanceof Ajv.ValidationError) {
                const errors = err.errors.map(({
                    params,
                    message
                }) => ({
                    ...params,
                    message
                }));

                return res.send(response(
                    "Validation Error",
                    status.FAILED,
                    StatusCodes.UNPROCESSABLE_ENTITY,
                    { errors }
                )).status(StatusCodes.UNPROCESSABLE_ENTITY);
            }

            return next(err);
        }
    };
};

module.exports = validateJsonSchema;