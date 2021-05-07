const mongoose = require('mongoose')

const Schema = mongoose.Schema
const menuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: String,
  category: String,
  image: String,
  location: String,
  phone: String,
  google_map: String,
  rating: Number,
  description: String,
  isDone: {
    type: Boolean,
    required: false
  }
})

module.exports = mongoose.model('Menu', menuSchema)