const express = require("express");
const router = express.Router();

const {
  list_all_activityLists,
  find_one_activityList,
  create_one_activityList,
  partUpdate_one_activityList,
  fullUpdate_one_activityList,
  delete_one_activityList,
  delete_many_activityLists,
  delete_all_activityLists
} = require("../controllers/activityListController");

router
.route("/")
.get(list_all_activityLists)
.post(create_one_activityList)
.delete(delete_many_activityLists);
router
.route("/deleteAll")
.delete(delete_all_activityLists);

router
.route("/:id")
.get(find_one_activityList)
.patch(partUpdate_one_activityList) 
.put(fullUpdate_one_activityList)
.delete(delete_one_activityList)



module.exports = router;