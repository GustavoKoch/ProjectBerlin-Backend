const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const activityListSchema = new Schema({
    starts_date:{type:Date, required:true},
    ends_date:{type:Date, required:true},
    title:{type:String, min: 2, max:50, required:true},
    description:{type:String, min: 2, max:500},   
    calenderItem: [{ type: Schema.Types.ObjectId, ref: "CalenderItem" }],
    associated_item_id1: [{ type: Schema.Types.ObjectId, ref: "VacationPlaning" }],
    category: {
        type:String,
        enum:['Social events', 'Reminders', 'Birthdays', 'Vacation', 'Packing-List', 'Shopping', 'ToDos', 'Personal' ]
    },   
    imgBackground_url:{type:String, min: 2, max:500},

}, {timestamps:true}
)


//Model is a class and compiles the schema. It contains the blueprint and makes it possible to make queries.
const ActivityList=mongoose.model('ActivityList', activityListSchema);

module.exports = ActivityList;