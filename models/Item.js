const { Schema, model } = require('mongoose')

module.exports = model('Item', new Schema({
  text: String,
  isDone: Boolean
}))
