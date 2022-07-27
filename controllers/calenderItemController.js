const CalenderItem = require("../models/CalenderItem");

/* GET ALL */
const list_all_calenderItems = async(req, res) => {
 
    try {
      const calenderItems = await CalenderItem.find({});
     
      if (calenderItems.length===0)
      return res.status(404).send("There are no Items in this Calender to show");
      
      res.json(calenderItems);
    } catch {
      (error) => console.log(error.message);
    }
};

/* CREATE ONE */
const create_one_calenderItem= async (req, res) => {

  try {    
    const newCalenderItem= await CalenderItem.create(req.body);  
    res.json(newCalenderItem);
  } catch {
    (error) => res.send(error.message);
  }
};

/* GET ONE */
const find_one_calenderItem = async (req, res) => {
  const { id } = req.params;
  try {
    const specificCalenderItem = await CalenderItem.findById(id);
    if (!specificCalenderItem)
      return res.status(404).send("This item does not exist in the calender");
    res.json(specificCalenderItem);
  } catch {
    (error) => console.log(error.message);
  }
};

/* PATCH  */
const partUpdate_one_calenderItem = async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body;

try {
    const updatedCalenderItem = await CalenderItem.updateOne(
      { _id: id },
      { [key]: value }
    );
    if (!updatedCalenderItem.modifiedCount)
      return res
        .status(404)
        .send("This calenderItem does not exist, and can not be patched");

    try {
        const specificCalenderItem = await CalenderItem.findById(id);
        if (!specificCalenderItem)
            return res.status(404).send("This item does not exist in the calender");
        res.json(specificCalenderItem);
        } catch {
        (error) => console.log(error.message);
        }

    res.send("Calender-Item patched succesfully!");

  } catch {
    (error) => console.log(error.message);
  }
};
/* UPDATE  */
const fullUpdate_one_calenderItem = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCalenderItem = await CalenderItem.findOneAndUpdate({_id:id}, req.body, {
      new: false,
      runValidators: true,
    });
    console.log(updatedCalenderItem);
    if (!updatedCalenderItem)
      return res
        .status(404)
        .send("This calender Item does not exist, maybe it was deleted before");

    res.json(updatedCalenderItem).send("Calender Item patched succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* DELETE */
const delete_one_calenderItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCalenderItem = await CalenderItem.findOneAndDelete({ _id: id });
    
    if (!deletedCalenderItem) {
      return res
        .status(404)
        .send("This calender-item does not exist, maybe it was deleted before");
    }
    res.json(deletedCalenderItem).send("Calender-Item deleted succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* DELETE MANY */
const delete_many_calenderItems = async (req, res) => {
  const { key, value } = req.body;
  console.log(key);
  try {
    if (!key || !value) {
      return res.status(404).send("Provide a valid key-value pair!!");
    }
    const calenderItemsBeforeDeletion = await CalenderItem.find({[key]: value });
   
    if (calenderItemsBeforeDeletion.length===0) {
        return res
          .status(404)
          .send("The calender items seacrh for deletion does not exist, maybe they were deleted before");
      }

    const deletedManyCalenderItems = await CalenderItem.deleteMany({ [key]: value });
    res.json(calenderItemsBeforeDeletion).send("CalenderItemSSS deleted succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};


/* DELETE ALL CALENDER ITEMS */
const delete_all_calenderItems = async (req, res) => {

    try {   
      const deletedAllCalenderItems = await CalenderItem.deleteMany({});       

      if (deletedAllCalenderItems.deletedCount===0) 
        return res
          .status(404)
          .send("The calender is empty, nothing to delete here");

      res.json(deletedAllCalenderItems).send("*****ALL CalenderItemSSS deleted succesfully!****");
    } catch {
      (error) => console.log(error.message);
    }
  };

module.exports = {
  list_all_calenderItems,
  find_one_calenderItem,
  create_one_calenderItem,
  partUpdate_one_calenderItem,
  fullUpdate_one_calenderItem,
  delete_one_calenderItem,
  delete_many_calenderItems,
  delete_all_calenderItems
};
