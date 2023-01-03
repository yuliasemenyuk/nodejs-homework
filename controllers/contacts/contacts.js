const {Contact} = require('../../models/contactModel');
const { HttpError } = require('../../helpers');
const { ctrlWrapper } = require('../../helpers');

const listContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
  // try {
    // const contacts = Contact.find({});
  //   // console.log(contacts);
  //   return contacts;
  // } catch (error) {
  //   console.log(error);
  // }
}

const getContactById = async (req, res) => {
  const {contactId} = req.params;
  const contact = await Contact.findById(contactId);
      if (!contact) {
        throw HttpError(404)
      }
  res.json(contact);
    // try {
    //   const contact = await Contact.findById(contactId);
    //   return contact || null;
    // } catch (error) {
    //   console.log(error);
    // }
}

const removeContact = async (req, res) => {
  const {contactId} = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);
    if (!deletedContact) {
      throw HttpError(404);
    }
  res.json({message: "Contact deleted"});
    // try {
    //   const deletedContact = await Contact.findByIdAndRemove(contactId);
    //   return deletedContact;
    // } catch (error) {
    //   console.log(error);
    // }
}

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
  // try {
  //   const newContact = new Contact(body);
  //   await newContact.save();
  //   return newContact;
  // } catch (error) {
  //   console.log(error);
  // }
}

const updateContact = async (req, res) => {
  const {contactId} = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true
  });
    if (!updatedContact) {
      throw HttpError(404)
    }
  res.json(updatedContact);
  // try {
  //   await Contact.findByIdAndUpdate(contactId, body);
  //   return body;

  // } catch (error) {
  //   console.log(error);
  // }
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
  // try {
  //     const contactStatusUpdated = await Contact.findByIdAndUpdate(contactId, {body}, {
  //       new: true,
  //     });
  //     return contactStatusUpdated;
      
  // } catch (error) {
  //   console.log(error);
  // }
}


module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
}
