const express = require('express');
const ctrl = require('../../controllers/auth');
// const authMiddleware = require('../../middlewares/authMiddleware')

// const {validateBody} = require('../../middlewares')

const router = express.Router();

router.post('/register', ctrl.registerUser);

router.post('/login', ctrl.login);

module.exports = router;