const {Contact} = require('../../models/contactModel');
const { HttpError } = require('../../helpers');
const { ctrlWrapper } = require('../../helpers');
const {contactUpdateSchema, contactCreateSchema} = require('../../schemas/contact');

const listContacts = async (req, res) => {
  const {_id: owner} = req.user;  
  const {page = 1, limit = 20} = req.query;
  const skip =(page - 1) * limit;
  const contacts = await Contact.find({owner}, null, {skip, limit});
  res.json(contacts);
}


const getContactById = async (req, res) => {  
  const {contactId} = req.params;
  console.log(contactId)
  const contact = await Contact.findById(contactId);
      if (!contact) {
        throw HttpError(404)
      }
  res.json(contact);
}

const removeContact = async (req, res) => {
  const {contactId} = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);
    if (!deletedContact) {
      throw HttpError(404);
    }
  res.json({message: "Contact deleted"});
}

const addContact = async (req, res) => {
  const validationResult = contactCreateSchema.validate(req.body);
  if (validationResult.error) {
      return res.status(400).json({status: validationResult.error})
    }

  const {_id: owner} = req.user;  
  const newContact = await Contact.create({...req.body, owner});
  res.status(201).json(newContact);
}

const updateContact = async (req, res) => {
  const {contactId} = req.params;

  const validationResult = contactUpdateSchema.validate(req.body);
      if (validationResult.error) {
  return res.status(400).json({status: validationResult.error})
}


  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true
  });
    if (!updatedContact) {
      throw HttpError(404)
    }
  res.json(updatedContact);
}

const updateStatusContact = async (req, res) => {
  const {contactId} = req.params;
  const contactStatUpd = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true
  });
    if (!contactStatUpd) {
      throw HttpError(404)
    }
  res.json(contactStatUpd);
}


module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
}
