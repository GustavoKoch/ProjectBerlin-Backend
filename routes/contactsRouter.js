const express = require("express");
const router = express.Router();

const {
  list_all_contacts,
  find_one_contact,
  create_one_contact,
  partUpdate_one_contact,
  fullUpdate_one_contact,
  delete_one_contact,
  delete_many_contacts,
  delete_all_contacts
} = require("../controllers/contactController");

router
.route("/")
.get(list_all_contacts)
.post(create_one_contact)
.delete(delete_many_contacts);
router
.route("/deleteAll")
.delete(delete_all_contacts);

router
.route("/:id")
.get(find_one_contact)
.patch(partUpdate_one_contact) 
.put(fullUpdate_one_contact)
.delete(delete_one_contact)



module.exports = router;