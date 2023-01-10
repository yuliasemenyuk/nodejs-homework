const mongoose = require('mongoose');
const {handleMongooseError} = require("../helpers");

const contactSchema = new mongoose.Schema (
    {
        name: {
          type: String,
          required: [true, 'Set name for contact'],
          unique: true,
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
        owner: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'users',
          required: true,
        }
    },
  {versionKey: false}
)

contactSchema.post("save", handleMongooseError);

const Contact = mongoose.model ('contacts', contactSchema);

module.exports = {
  Contact,
};