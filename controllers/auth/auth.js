const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const path = require('path');
const gravatar = require('gravatar');
var Jimp = require('jimp');
const {User} = require('../../models/userModel');
const { HttpError } = require('../../helpers');
const { ctrlWrapper } = require('../../helpers');
const {userRegisterSchema, userLoginSchema } = require('../../schemas/users');


const registerUser = async (req, res) => {
    const {email, password} = req.body;

    const validationResult = userRegisterSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({status: validationResult.error})
    }
    
    const user = await User.findOne({email});
    if (user) {
        throw HttpError(409, "Email in use")
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

const login = async (req, res) => {
    const {email, password} = req.body;

    const validationResult = userLoginSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({status: validationResult.error})
    }
    
    const user = await User.findOne({email});
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    };

    const passwordCompare = await bcrypt.compare(password, user.password);
   if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
   };

   const payload = {
    id: user._id,
   }

   const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1w"});
   await User.findByIdAndUpdate(user._id, {token});
   res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    }
   })
}

const logout = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});
    res.status(204).json();
}

const getCurrentUser = async (req, res) => {
    const {email, subscription, avatarURL} = req.user;
    res.json({email, subscription, avatarURL});
}

const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const {path: prevPath, filename} = req.file;
    (await Jimp.read(prevPath)).resize(250, 250);
 
    const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');
    
    const newPath = path.join(avatarsDir, filename);
    await fs.rename(prevPath, newPath);

    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, {avatarURL});

    if (!avatarURL) {
        throw HttpError(401, "Not authorized")
    };

    res.status(200).json({avatarURL});
}

module.exports = {
    registerUser: ctrlWrapper(registerUser),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getCurrentUser: ctrlWrapper(getCurrentUser),
    updateAvatar: ctrlWrapper(updateAvatar),
};