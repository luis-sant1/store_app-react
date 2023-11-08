const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select : false
    },
    address: {
        type: String,
    },
    phone: {
        type: Number
    },
    role: {
        type: ["user", "admin"],
        default: "user"
    },
    favoritos: {
        type: Array,
        default: []
    }
},
{
    timestamps : true,
    versionKey : false
}
)

module.exports = mongoose.model('Users', UserSchema);