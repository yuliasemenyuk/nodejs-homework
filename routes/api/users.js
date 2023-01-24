const express = require('express');
const ctrl = require('../../controllers/auth');
const {authMiddleware, upload} = require('../../middlewares');


const router = express.Router();

router.post('/register', ctrl.registerUser);

router.post('/login', ctrl.login);

router.post('/logout', authMiddleware, ctrl.logout);

router.get('/current', authMiddleware, ctrl.getCurrentUser);

router.patch('/avatars', authMiddleware, upload.single('avatar'), ctrl.updateAvatar);

router.get('/verify/:verificationToken', ctrl.verifyUser);

router.get('/verify', ctrl.resendVerify);


module.exports = router;