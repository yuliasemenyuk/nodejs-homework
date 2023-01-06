const Joi = require('joi');

const userRegisterSchema = Joi.object({
    password: Joi.string()
        .min(5)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    subscription: Joi.string()
        .valid("starter", "pro", "business")
        // .required()
    // token: Joi.string()
    //     .required()
});

const userLoginSchema = Joi.object({
    password: Joi.string()
        .min(5)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
    // token: Joi.string()
    //     .required()
});

module.exports = {
    userRegisterSchema,
    userLoginSchema,
}
// password: {
//     type: String,
//     required: [true, 'Set password for user'],
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//   },
//   subscription: {
//     type: String,
//     enum: ["starter", "pro", "business"],
//     default: "starter"
//   },
//   token: String