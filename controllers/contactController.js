const Contact = require("../models/Contacts");

/* GET ALL */
const list_all_contacts = async(req, res) => {
 
    try {
      const contacts = await Contact.find({});
     
      if (contacts.length===0)
      return res.status(404).send("There are no Items in this Calender to show");
      
      res.json(contacts);
    } catch {
      (error) => console.log(error.message);
    }
};

/* CREATE ONE */
const create_one_contact= async (req, res) => {

  try {    
    const newcontact= await Contact.create(req.body);  
    res.json(newcontact);
  } catch {
    (error) => res.send(error.message);
  }
};

/* GET ONE */
const find_one_contact = async (req, res) => {
  const { id } = req.params;
  try {
    const specificcontact = await Contact.findById(id);
    if (!specificcontact)
      return res.status(404).send("This item does not exist in the calender");
    res.json(specificcontact);
  } catch {
    (error) => console.log(error.message);
  }
};

/* PATCH  */
const partUpdate_one_contact = async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body;

try {
    const updatedcontact = await Contact.updateOne(
      { _id: id },
      { [key]: value }
    );
    if (!updatedcontact.modifiedCount)
      return res
        .status(404)
        .send("This contact does not exist, and can not be patched");

    try {
        const specificcontact = await Contact.findById(id);
        if (!specificcontact)
            return res.status(404).send("This item does not exist in the calender");
        res.json(specificcontact);
        } catch {
        (error) => console.log(error.message);
        }

    res.send("Calender-Item patched succesfully!");

  } catch {
    (error) => console.log(error.message);
  }
};
/* UPDATE  */
const fullUpdate_one_contact = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedcontact = await Contact.findOneAndUpdate({_id:id}, req.body, {
      new: false,
      runValidators: true,
      upsert:true,
    });
    console.log(updatedcontact);
    if (!updatedcontact)
      return res
        .status(404)
        .send("This contact Item does not exist, maybe it was deleted before");

    res.json(updatedcontact).send("Contact Item updated succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* DELETE */
const delete_one_contact = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedcontact = await Contact.findOneAndDelete({ _id: id });
    
    if (!deletedcontact) {
      return res
        .status(404)
        .send("This calender-item does not exist, maybe it was deleted before");
    }
    res.send("CAlender-Item deleted succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* DELETE MANY */
const delete_many_contacts = async (req, res) => {
  const { key, value } = req.body;
  console.log(key);
  try {
    if (!key || !value) {
      return res.status(404).send("Provide a valid key-value pair!!");
    }
    const contactsBeforeDeletion = await Contact.find({[key]: value });
   
    if (contactsBeforeDeletion.length===0) {
        return res
          .status(404)
          .send("The calender items seacrh for deletion does not exist, maybe they were deleted before");
      }

    const deletedManycontacts = await Contact.deleteMany({ [key]: value });
    res.json(contactsBeforeDeletion).send("contactSSS deleted succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};


/* DELETE ALL CALENDER ITEMS */
const delete_all_contacts = async (req, res) => {

    try {   
      const deletedAllcontacts = await Contact.deleteMany({});       

      if (deletedAllcontacts.deletedCount===0) 
        return res
          .status(404)
          .send("The calender is empty, nothing to delete here");

      res.json(deletedAllcontacts).send("*****ALL contactSSS deleted succesfully!****");
    } catch {
      (error) => console.log(error.message);
    }
  };

module.exports = {
  list_all_contacts,
  find_one_contact,
  create_one_contact,
  partUpdate_one_contact,
  fullUpdate_one_contact,
  delete_one_contact,
  delete_many_contacts,
  delete_all_contacts
};
