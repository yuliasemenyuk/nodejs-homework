const jwt = require('jsonwebtoken');
const {User} = require('../models/userModel');
const {HttpError} = require("../helpers");

const authMiddleware = async (req, res, next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
        next(HttpError(401, "Not authorized"))
    }

    try {
        const {id} = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(id);
        if (!user) {
            next(HttpError(401, "Not authorized"))
        }
        next();
    } catch (error) {
        next(HttpError(401, "Not authorized"))
    }
}

module.exports = authMiddleware;