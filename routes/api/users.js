const express = require('express');
const ctrl = require('../../controllers/auth');

// const {validateBody} = require('../../middlewares')

const router = express.Router();

router.post('/register', ctrl.registerUser);

router.post('/login', ctrl.login);

module.exports = router;