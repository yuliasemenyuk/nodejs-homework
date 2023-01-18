const authMiddleware = require('./authMiddleware');
const upload = require('./uploadMiddleware');

module.exports = {
    authMiddleware,
    upload
};