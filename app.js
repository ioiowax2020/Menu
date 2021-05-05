const express = require('express')
const app = express()
const port = 3000
const menuList = require('./restaurant.json')
const Menu = require('./models/menu')
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


//設定模板引擎
app.engine('hbs', exphbs({ defaultlayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//載入接受post 請求的內容 body-parser
app.use(bodyParser.urlencoded({ extended: true }))


//setting static files
app.use(express.static('public'))

//setting routing
app.get('/', (req, res) => {
  Menu.find()
    .lean()
    .then(menus => res.render('index', { menus }))
    .catch(error => console.log(error))

})




//瀏覽一筆資料
app.get('/menu/detail/:id', (req, res) => {

  const id = req.params.id

  return Menu.findById(id)
    .lean()
    .then((menu) => res.render('detail', { menu }))
    .catch(error => console.log(error))

})


app.post('/menu/detail/:id', (req, res) => {

  const id = req.params.id

  return Menu.findById(id)
    .lean()
    .then((menu) => res.render('detail', { menu }))
    .catch(error => console.log(error))

})

// app.get('/search', (req, res) => {

//   const keyword = req.query.keyword
//   const searchMenu = menuList.results.filter(menu => {
//     return menu.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || menu.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())

//   })
//   res.render('index', { menuList: searchMenu, keyword: keyword })

// })


app.listen(port, () => {

  console.log(`Listenling on this local: ${port}`)
})

