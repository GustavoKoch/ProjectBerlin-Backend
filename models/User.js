const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      },
    
      password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
      },
  
}, {timestamps:true}
)



//Model is a class and compiles the schema. It contains the blueprint and makes it possible to make queries.
const User=mongoose.model('User', userSchema);

module.exports = User;