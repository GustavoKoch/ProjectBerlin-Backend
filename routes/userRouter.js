const express = require("express");
const router = express.Router();

const {
  list_all_users,
  find_one_user,
  create_one_user,
  partUpdate_one_user,
  fullUpdate_one_user,
  delete_one_user,
  delete_many_users,
  delete_all_users,
  login_user
} = require("../controllers/userController");

router
.route("/")
.get(list_all_users)
.delete(delete_many_users);

router
.route("/register")
.post(create_one_user)

router
.route("/login")
.post(login_user)

router
.route("/deleteAll")
.delete(delete_all_users);

router
.route("/:id")
.get(find_one_user)
.patch(partUpdate_one_user) 
.put(fullUpdate_one_user)
.delete(delete_one_user)


module.exports = router;