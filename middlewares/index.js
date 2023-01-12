const authMiddleware = require('./authMiddleware');
const upload = require('./multerMiddleware');

module.exports = {
    authMiddleware,
    upload
};