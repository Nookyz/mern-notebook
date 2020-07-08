const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  notes: {
    type: Types.ObjectId,
    ref: 'Note'
  }
}) 

module.exports = model('User', schema)