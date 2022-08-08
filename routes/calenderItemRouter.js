const express = require("express");
const router = express.Router();

const {
  list_all_calenderItems,
  find_one_calenderItem,
  create_one_calenderItem,
  partUpdate_one_calenderItem,
  fullUpdate_one_calenderItem,
  delete_one_calenderItem,
  delete_many_calenderItems,
  delete_all_calenderItems,
  add_ContactsToCalenderItem,
  add_ActivityListToCalenderItem,
  list_all_birthdays,
  create_many_birthdays
} = require("../controllers/calenderItemController");

router
.route("/")
.get(list_all_calenderItems)
.post(create_one_calenderItem)
.delete(delete_many_calenderItems);
router
.route("/birthdays")
.get(list_all_birthdays)
.post(create_many_birthdays)

router
.route("/addContacts")
.patch(add_ContactsToCalenderItem) 
router
.route("/addActivityList")
.patch(add_ActivityListToCalenderItem) 


router
.route("/deleteAll")
.delete(delete_all_calenderItems);


router
.route("/:id")
.get(find_one_calenderItem)
.patch(partUpdate_one_calenderItem) 
.put(fullUpdate_one_calenderItem)
.delete(delete_one_calenderItem)



module.exports = router;