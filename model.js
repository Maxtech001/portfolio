const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    // This paragraph helps to set my data forms
    name: String, // String is shorthand for {type: String}
    email: { type: String,},
    subject: { type: String,},
    date: { type: Date, default: Date.now },
    message: { type: String,}
    
});
// modelling ends here

// Modelling

const Message = mongoose.model("message", messageSchema);
module.exports = Message;