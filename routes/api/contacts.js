const express = require('express');
// `const contacts = require('../../controllers/contacts/contacts');
// const {contactUpdateSchema, contactCreateSchema} = require('../../schemas/contact');
const ctrl = require('../../controllers/contacts/contacts');


const router = express.Router()

router.get('/', ctrl.listContacts);
// async (req, res) => {
//   const contactsList = await contacts.listContacts();
//   res.json({
//     status: 'success',
//     code: 200,
//     data: {
//       contactsList,
//     } 
//   });
// });


router.get('/:contactId', ctrl.getContactById);
// async (req, res) => {
//   const  {contactId}  = req.params;
//   const contact = await contacts.getContactById(contactId);
//   res.json({
//     status: 'success',
//     code: 200,
//     data: {
//       contact,
//     }
//   });
// });

router.post('/', ctrl.addContact);
// async (req, res, next) => {
//   const {name, email, phone, favorite} = req.body;

// const validationResult = contactCreateSchema.validate(req.body);
// if (validationResult.error) {
//   return res.status(400).json({status: validationResult.error})
// }

//   const newContact = {
//       name, 
//       email,
//       phone,
//       favorite
//   };
//   contacts.addContact(newContact);
//   res.json({
//     status: 'success',
//     code: 201,
//     data: {
//       newContact,
//     }
//   });
// });

router.delete('/:contactId', ctrl.removeContact)
// async (req, res, next) => {
//   const  {contactId}  = req.params;
//   const deletedContact = await contacts.removeContact(contactId);
//   if (!deletedContact) {
//     return res.status(404).json({ message: "Not found" });
//   }
//   res.json({
//     status: 'success',
//     code: 200,
//     message: "contact deleted"
//   })
// })

router.put('/:contactId', ctrl.updateContact);
// async (req, res, next) => {
//   const {name, email, phone} = req.body;
//   const  {contactId} = req.params;

//   const validationResult = contactUpdateSchema.validate(req.body);
//       if (validationResult.error) {
//   return res.status(400).json({status: validationResult.error})
// }

//   const contact = {
//     name,
//     email,
//     phone
//   };
//   const updatedContact = await contacts.updateContact(contactId, contact);
//   if (!updatedContact) {
//     return res.status(404).json({ message: "Not found" });
//   }
//   res.json({ 
//     status: 'success',
//     code: 200,
//     data: {
//       updatedContact,
//     }
//    })
// })

router.patch('/:contactId/favorite', ctrl.updateStatusContact);
// async (req, res, next) => {
//   const {favorite: body} = req.body;
//   const  {contactId} = req.params;
//   if (!body) {
//     res.json({message: "missing field favorite"})
//   }
//   const contactStatUpd = await contacts.updateStatusContact(contactId, body)
//   console.log(contactStatUpd);
//   if (!contactStatUpd) {
//     return res.status(404).json({ message: "Not found" });
//   }
//   res.json({ 
//     status: 'success',
//     code: 200,
//     data: {
//       contactStatUpd
//     }
//    })
// })


module.exports = router
