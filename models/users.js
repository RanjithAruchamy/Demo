const mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {
        name:{type: String, required: true},
        age:{type: Number}
    }
)

const User = mongoose.model("Users", userSchema);
module.exports = User;