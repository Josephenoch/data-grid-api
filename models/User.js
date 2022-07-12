const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age:{
    type: Number,
    required:true
  },
  description:{
    type: String,
    required:true
  },
  pay:{
    type: Number,
    required: true
  },
  
})

module.exports = mongoose.model('User', UserSchema)