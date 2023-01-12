const express = require('express');
const ctrl = require('../../controllers/auth');
const {authMiddleware, upload} = require('../../middlewares');
// const multer = require('multer');
// const path = require('path');
// const { v4: uuidv4 } = require('uuid');

// Del
// const dir = path.resolve(('./avatars'))
// console.log(dir);

const router = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.resolve('./tmp'))
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '_' + uuidv4())
//     },
// });

router.post('/register', ctrl.registerUser);

router.post('/login', ctrl.login);

router.post('/logout', authMiddleware, ctrl.logout);

router.get('/current', authMiddleware, ctrl.getCurrentUser);

router.patch('/avatar', upload.single('avatar'), ctrl.updateAvatar);

// Del
// router.get('/avatar', express.static(dir))


module.exports = router;