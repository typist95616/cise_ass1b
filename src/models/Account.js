const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    emailAddress: {type:String, required:true},
    password: {type:String, required: true},
    createDate: {type:Date, required: true},
})

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;