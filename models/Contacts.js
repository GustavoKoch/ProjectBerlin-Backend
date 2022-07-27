const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const contactSchema = new Schema({
    first_name:{type:String, min: 2, max:50, required:true}, 
    last_name:{type:String, min: 2, max:50, required:true}, 
    birthday:{type:Date},
    nameday:{type:Date},
    category: {
        type:String,
        enum:['family', 'friend', 'others']
    },  
    avatar_url:{type:String, min: 2, max:500},
    calenderItem: [{ type: Schema.Types.ObjectId, ref: "CalenderItem" }],
    activityList: [{ type: Schema.Types.ObjectId, ref: "ActivityList" }],

}, {timestamps:true}
)



//Model is a class and compiles the schema. It contains the blueprint and makes it possible to make queries.
const Contact=mongoose.model('Contact', contactSchema);

module.exports = Contact;