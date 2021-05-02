const express = require('express')
const app = express()
const port = 3000
const menuList = require('./restaurant.json')
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/Menu_list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection


db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {

  console.log('mongodb connected!')

})



//setting engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

//setting routing
app.get('/', (req, res) => {

  res.render('index', { menuList: menuList.results })
})


app.get('/restaurants/:menu_id', (req, res) => {

  const menuId = req.params.menu_id
  const menuListS = menuList.results.find(Menu =>
    Menu.id.toString() === menuId)

  res.render('show', { menuList: menuListS })

})

app.get('/search', (req, res) => {

  const keyword = req.query.keyword
  const searchMenu = menuList.results.filter(menu => {
    return menu.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || menu.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())

  })
  res.render('index', { menuList: searchMenu, keyword: keyword })

})


app.listen(port, () => {

  console.log(`Listenling on this local:${port}`)
})

