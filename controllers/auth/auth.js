const bcrypt = require('bcryptjs');
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

    const newUser = await User.create({...req.body, password: hashPassword});
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

   const token = "";
   res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    }
   })
}

module.exports = {
    registerUser: ctrlWrapper(registerUser),
    login: ctrlWrapper(login),
};