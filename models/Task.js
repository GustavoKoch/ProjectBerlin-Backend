const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const taskSchema = new Schema({
    starts_date:{type:Date, required:true},
    ends_date:{type:Date, required:true},
    num: {type:Number, required:true},
    description:{type:String, min: 0, max:500, required:true},
    category: {
        type:String,
        enum:['urgent', 'important', 'would-be-nice', 'idea']
    },  
  
}, {timestamps:true}
)



//Model is a class and compiles the schema. It contains the blueprint and makes it possible to make queries.
const Task=mongoose.model('Task', taskSchema);

module.exports = Task;