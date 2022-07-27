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
  delete_all_calenderItems
} = require("../controllers/calenderItemController");

router
.route("/")
.get(list_all_calenderItems)
.post(create_one_calenderItem)
.delete(delete_many_calenderItems);
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