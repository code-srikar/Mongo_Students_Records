const mongoose = require('mongoose');

const stundentSchema = mongoose.Schema({
    _id: Number,
    name: String,
    email: String,
    mobile: Number
});

const studentModel = mongoose.model("student", stundentSchema);

module.exports = studentModel;