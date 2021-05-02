const mongoose = require('mongoose')
const Menu = require('../menu')


mongoose.connect('mongodb://localhost/menuList', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection


db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {

  console.log('mongodb connected!')


  Menu.create({})


  console.log('done!')
})