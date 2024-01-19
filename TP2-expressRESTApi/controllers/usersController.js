const { StatusCodes } = require('http-status-codes');
const response = require('../shared/apiResponse.js');
const status = require('../constants/status.js');
const query = require('../data/queries.js');

const getUsers = async (req, res, next) => {
    try {
        const { page, limit } = req.query

        let results = await query.getPage("users", page, limit, `${req.hostname + req.originalUrl}`);

        res.send(response(
            "Fetched All Users",
            status.SUCCESS,
            StatusCodes.OK,
            { data: results }
        )).status(StatusCodes.OK);
    } catch (error) {
        res.send(response(
            error.message,
            status.FAILED,
            StatusCodes.BAD_REQUEST,
            { errors: error }
        )).status(StatusCodes.BAD_REQUEST);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        let result = await query.getById("users", id);

        if (!result) res.send("Not found").status(404);
        else res.send(response(
            `User With Id:${id} Found`,
            status.SUCCESS,
            StatusCodes.OK,
            { data: result }
        )).status(StatusCodes.OK);
    } catch (error) {
        res.send(response(
            error.message,
            status.FAILED,
            StatusCodes.BAD_REQUEST,
            { errors: error }
        )).status(StatusCodes.BAD_REQUEST);
    }
}

const createUser = async (req, res, next) => {
    try {
        let result = await query.create("users", req.body);

        res.send(response(
            "User Created",
            status.SUCCESS,
            StatusCodes.CREATED,
            { data: result }
        )).status(StatusCodes.CREATED);
    } catch (error) {
        res.send(response(
            error.message,
            status.FAILED,
            StatusCodes.BAD_REQUEST,
            { errors: error }
        )).status(StatusCodes.BAD_REQUEST);
    }
}

const editUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        let result = await query.update("users", id, req.body);

        if (!result)
            res.send(response(
                `Edit User Failed`,
                status.FAILED,
                StatusCodes.NOT_FOUND,
                { error: `Id:${id} doesn't exist` }
            )).status(StatusCodes.NOT_FOUND);

        res.send(response(
            "User Modified",
            status.SUCCESS,
            StatusCodes.OK,
            { data: result }
        )).status(StatusCodes.OK);
    } catch (error) {
        res.send(response(
            error.message,
            status.FAILED,
            StatusCodes.BAD_REQUEST,
            { errors: error }
        )).status(StatusCodes.BAD_REQUEST);
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        await query.remove("users", id);

        res.send(response(
            "User Deleted",
            status.SUCCESS,
            StatusCodes.OK,
            { data: "NO_DATA" }
        )).status(StatusCodes.OK);
    } catch (error) {
        res.send(response(
            error.message,
            status.FAILED,
            StatusCodes.BAD_REQUEST,
            { errors: error }
        )).status(StatusCodes.BAD_REQUEST);
    }
}

module.exports = {
    createUser, deleteUserById, editUserById, getUserById, getUsers
};
