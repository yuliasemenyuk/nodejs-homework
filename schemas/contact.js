const Joi = require('joi');
const contactCreateSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string()
    .required()
    .min(1),
  favorite: Joi.boolean()
});

const contactUpdateSchema = Joi.object({
  name: Joi.string()
    .min(1),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string()
});

module.exports = {
    contactCreateSchema, 
    contactUpdateSchema,
}