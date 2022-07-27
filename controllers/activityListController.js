const ActivityList = require("../models/ActivityList");

/* GET ALL */
const list_all_activityLists = async(req, res) => {
 
    try {
      const activityLists = await ActivityList.find({});
     
      if (activityLists.length===0)
      return res.status(404).send("There are no ActivityLists to show");
      
      res.json(activityLists);
    } catch {
      (error) => console.log(error.message);
    }
};

/* CREATE ONE */
const create_one_activityList= async (req, res) => {

  try {    
    const newActivityList= await ActivityList.create(req.body);  
    res.json(newActivityList);
  } catch {
    (error) => res.send(error.message);
  }
};

/* GET ONE */
const find_one_activityList = async (req, res) => {
  const { id } = req.params;
  try {
    const specificactivityList = await ActivityList.findById(id);
    if (!specificactivityList)
      return res.status(404).send("This item does not exist in the calender");
    res.json(specificactivityList);
  } catch {
    (error) => console.log(error.message);
  }
};

/* PATCH  */
const partUpdate_one_activityList = async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body;

try {
    const updatedactivityList = await ActivityList.updateOne(
      { _id: id },
      { [key]: value }
    );
    if (!updatedactivityList.modifiedCount)
      return res
        .status(404)
        .send("This activityList does not exist, and can not be patched");

    try {
        const specificactivityList = await ActivityList.findById(id);
        if (!specificactivityList)
            return res.status(404).send("This item does not exist in the calender");
        res.json(specificactivityList);
        } catch {
        (error) => console.log(error.message);
        }

    res.send("Calender-Item patched succesfully!");

  } catch {
    (error) => console.log(error.message);
  }
};
/* UPDATE  */
const fullUpdate_one_activityList = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedactivityList = await ActivityList.findOneAndUpdate({_id:id}, req.body, {
      new: false,
      runValidators: true,
    });
    console.log(updatedactivityList);
    if (!updatedactivityList)
      return res
        .status(404)
        .send("This calender Item does not exist, maybe it was deleted before");

    res.json(updatedactivityList).send("Calender Item patched succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* DELETE */
const delete_one_activityList = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedactivityList = await ActivityList.findOneAndDelete({ _id: id });
    
    if (!deletedactivityList) {
      return res
        .status(404)
        .send("This calender-item does not exist, maybe it was deleted before");
    }
    res.json(deletedactivityList).send("CAlender-Item deleted succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* DELETE MANY */
const delete_many_activityLists = async (req, res) => {
  const { key, value } = req.body;
  console.log(key);
  try {
    if (!key || !value) {
      return res.status(404).send("Provide a valid key-value pair!!");
    }
    const activityListsBeforeDeletion = await ActivityList.find({[key]: value });
   
    if (activityListsBeforeDeletion.length===0) {
        return res
          .status(404)
          .send("The calender items seacrh for deletion does not exist, maybe they were deleted before");
      }

    const deletedManyactivityLists = await ActivityList.deleteMany({ [key]: value });
    res.json(activityListsBeforeDeletion).send("activityListSSS deleted succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};


/* DELETE ALL CALENDER ITEMS */
const delete_all_activityLists = async (req, res) => {

    try {   
      const deletedAllactivityLists = await ActivityList.deleteMany({});       

      if (deletedAllactivityLists.deletedCount===0) 
        return res
          .status(404)
          .send("The calender is empty, nothing to delete here");

      res.json(deletedAllactivityLists).send("*****ALL activityListSSS deleted succesfully!****");
    } catch {
      (error) => console.log(error.message);
    }
  };

module.exports = {
  list_all_activityLists,
  find_one_activityList,
  create_one_activityList,
  partUpdate_one_activityList,
  fullUpdate_one_activityList,
  delete_one_activityList,
  delete_many_activityLists,
  delete_all_activityLists
};
