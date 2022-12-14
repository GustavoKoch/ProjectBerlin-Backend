const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const contactSchema = new Schema({
    firstName:{type:String, min: 2, max:50, required:true}, 
    lastName:{type:String, min: 2, max:50, required:true}, 
    birthday:{type:Date},
    nameday:{type:Date},
    category: {
        type:[String],
        enum:['family', 'friend', 'others']
    },  
    avatar_url:{type:String, min: 2, max:500},


}, {timestamps:true}
)



//Model is a class and compiles the schema. It contains the blueprint and makes it possible to make queries.
const Contact=mongoose.model('Contact', contactSchema);

module.exports = Contact;