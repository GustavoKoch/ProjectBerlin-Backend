const express = require("express");
const router = express.Router();

const {
  list_all_tasks,
  find_one_task,
  create_one_task,
  partUpdate_one_task,
  fullUpdate_one_task,
  delete_one_task,
  delete_many_tasks,
  delete_all_tasks
} = require("../controllers/taskController");

router
.route("/")
.get(list_all_tasks)
.post(create_one_task)
.delete(delete_many_tasks);
router
.route("/deleteAll")
.delete(delete_all_tasks);

router
.route("/:id")
.get(find_one_task)
.patch(partUpdate_one_task) 
.put(fullUpdate_one_task)
.delete(delete_one_task)



module.exports = router;