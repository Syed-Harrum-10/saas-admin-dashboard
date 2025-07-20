const mongoose = require("mongoose")

// Auth Model 

const AuthModel = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    plan: {
        type: String,
        enum: ["free", "pro"],
        default: "free"
    },
    avatar: {
    type: String, 
    required: false,
    default: null
  },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const exportAuth = mongoose.model("Auth_Service", AuthModel)

module.exports = exportAuth