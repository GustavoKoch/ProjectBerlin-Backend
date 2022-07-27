const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const calenderItemSchema = new Schema({
    starts_date:{type:Date, required:true},
    ends_date:{type:Date, required:true},
    title:{type:String, min: 2, max:150, required:true},
    description:{type:String, min: 2, max:500, required:true},
    activityList: [{ type: Schema.Types.ObjectId, ref: "ActivityList" }],
    contacts: [{ type: Schema.Types.ObjectId, ref: "Contact" }],
    category: {
        type:String,
        enum:['Social events', 'Reminders', 'Birthdays', 'Vacation', 'Sports', 'Personal']
    },  
    img_url:{type:String, min: 2, max:100}

}, {timestamps:true}
)





//Model is a class and compiles the schema. It contains the blueprint and makes it possible to make queries.
const CalenderItem=mongoose.model('CalenderItem', calenderItemSchema);

module.exports = CalenderItem;