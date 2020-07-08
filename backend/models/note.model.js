const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  headerText: {
    type: String,
    required: true,
  },
  mainText: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User'
  }
}) 

module.exports = model('Note', schema)