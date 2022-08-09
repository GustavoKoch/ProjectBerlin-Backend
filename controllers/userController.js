const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* GET ALL */
const list_all_users = async (req, res) => {

  try {
    const Users = await User.find({});

    if (Users.length === 0)
      return res.status(404).send("There are no Users to show");

    res.json(Users);
  } catch {
    (error) => console.log(error.message);
  }
};

/* CREATE ONE */
const create_one_user = async (req, res) => {

  const body = req.body;
  if (!(body.email && body.password)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }

  // creating a new mongoose doc from user data
  const user = new User(body);
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
};

/* LOGIN USER */
const login_user = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        //   create JWT token
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );

        res.status(200).json({ message: "Login Successful", email: user.email, token });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
};






/* GET ONE */
const find_one_user = async (req, res) => {
  const { id } = req.params;
  try {
    const specificUser = await User.find({ _id: id }).populate("tasks");
    if (!specificUser)
      return res.status(404).send("This item does not exist in the calender");
    res.json(specificUser);
  } catch {
    (error) => console.log(error.message);
  }
};

/* PATCH  */
const partUpdate_one_user = async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body;

  try {
    const updatedUser = await User.updateOne(
      { _id: id },
      { [key]: value }
    );
    if (!updatedUser.modifiedCount)
      return res
        .status(404)
        .send("This User does not exist, and can not be patched");

    try {
      const specificUser = await User.findById(id);
      if (!specificUser)
        return res.status(404).send("This item does not exist in the calender");
      res.json(specificUser);
    } catch {
      (error) => console.log(error.message);
    }

    res.send("Calender-Item patched succesfully!");

  } catch {
    (error) => console.log(error.message);
  }
};
/* UPDATE  */
const fullUpdate_one_user = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: false,
      runValidators: true,
    });
    console.log(updatedUser);
    if (!updatedUser)
      return res
        .status(404)
        .send("This calender Item does not exist, maybe it was deleted before");

    res.json(updatedUser).send("Calender Item patched succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* DELETE */
const delete_one_user = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findOneAndDelete({ _id: id });

    if (!deletedUser) {
      return res
        .status(404)
        .send("This calender-item does not exist, maybe it was deleted before");
    }
    res.json(deletedUser).send("CAlender-Item deleted succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* DELETE MANY */
const delete_many_users = async (req, res) => {
  const { key, value } = req.body;
  console.log(key);
  try {
    if (!key || !value) {
      return res.status(404).send("Provide a valid key-value pair!!");
    }
    const UsersBeforeDeletion = await User.find({ [key]: value });

    if (UsersBeforeDeletion.length === 0) {
      return res
        .status(404)
        .send("The calender items seacrh for deletion does not exist, maybe they were deleted before");
    }

    const deletedManyUsers = await User.deleteMany({ [key]: value });
    res.json(UsersBeforeDeletion).send("UserSSS deleted succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};


/* DELETE ALL CALENDER ITEMS */
const delete_all_users = async (req, res) => {

  try {
    const deletedAllUsers = await User.deleteMany({});

    if (deletedAllUsers.deletedCount === 0)
      return res
        .status(404)
        .send("The calender is empty, nothing to delete here");

    res.json(deletedAllUsers).send("*****ALL UserSSS deleted succesfully!****");
  } catch {
    (error) => console.log(error.message);
  }
};

module.exports = {
  list_all_users,
  find_one_user,
  create_one_user,
  partUpdate_one_user,
  fullUpdate_one_user,
  delete_one_user,
  delete_many_users,
  delete_all_users,
  login_user
};
