const Task = require("../models/Task");

/* GET ALL */
const list_all_tasks = async(req, res) => {
 
    try {
      const tasks = await Task.find({});
     
      if (tasks.length===0)
      return res.status(404).send("There are no Items in this List to show");
      
      res.json(tasks);
    } catch {
      (error) => console.log(error.message);
    }
};

/* CREATE ONE */
const create_one_task= async (req, res) => {

  try {    
    const newTask= await Task.create(req.body);  
    res.json(newTask);
  } catch {
    (error) => res.send(error.message);
  }
};

/* GET ONE */
const find_one_task = async (req, res) => {
  const { id } = req.params;
  try {
    const specifictask = await Task.findById(id);
    if (!specifictask)
      return res.status(404).send("This Item does not exist in the List");
    res.json(specifictask);
  } catch {
    (error) => console.log(error.message);
  }
};

/* PATCH  */
const partUpdate_one_task = async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body;

try {
    const updatedtask = await Task.updateOne(
      { _id: id },
      { [key]: value }
    );
    if (!updatedtask.modifiedCount)
      return res
        .status(404)
        .send("This task does not exist, and can not be patched");

    try {
        const specificTask = await Task.findById(id);
        if (!specificTask)
            return res.status(404).send("This Item does not exist in the List");
        res.json(specifictask);
        } catch {
        (error) => console.log(error.message);
        }

    res.send("List-Item patched succesfully!");

  } catch {
    (error) => console.log(error.message);
  }
};
/* UPDATE  */
const fullUpdate_one_task = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedtask = await Task.findOneAndUpdate({_id:id}, req.body, {
      new: false,
      runValidators: true,
    });
    console.log(updatedtask);
    if (!updatedtask)
      return res
        .status(404)
        .send("This List-Item does not exist, maybe it was deleted before");

    res.json(updatedtask).send("List-Item patched succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* DELETE */
const delete_one_task = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedtask = await Task.findOneAndDelete({ _id: id });
    
    if (!deletedtask) {
      return res
        .status(404)
        .send("This List-item does not exist, maybe it was deleted before");
    }
    res.json(deletedtask).send("List-Item deleted succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* DELETE MANY */
const delete_many_tasks = async (req, res) => {
  const { key, value } = req.body;
  console.log(key);
  try {
    if (!key || !value) {
      return res.status(404).send("Provide a valid key-value pair!!");
    }
    const tasksBeforeDeletion = await Task.find({[key]: value });
   
    if (tasksBeforeDeletion.length===0) {
        return res
          .status(404)
          .send("The List-Item seacrhed for deletion does not exist, maybe they were deleted before");
      }

    const deletedManytasks = await Task.deleteMany({ [key]: value });
    res.json(tasksBeforeDeletion).send("taskSSS deleted succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};


/* DELETE ALL CALENDER ITEMS */
const delete_all_tasks = async (req, res) => {

    try {   
      const deletedAlltasks = await Task.deleteMany({});       

      if (deletedAlltasks.deletedCount===0) 
        return res
          .status(404)
          .send("The calender is empty, nothing to delete here");

      res.json(deletedAlltasks).send("*****ALL taskSSS deleted succesfully!****");
    } catch {
      (error) => console.log(error.message);
    }
  };

module.exports = {
  list_all_tasks,
  find_one_task,
  create_one_task,
  partUpdate_one_task,
  fullUpdate_one_task,
  delete_one_task,
  delete_many_tasks,
  delete_all_tasks
};
