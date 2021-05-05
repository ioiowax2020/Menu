const express = require('express')
const app = express()
const port = 3000
const Menu = require('./models/menu')
const exphbs = require('express-handlebars')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/menuList', { useNewUrlParser: true, useUnifiedTopology: true })
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

//setting routing 瀏覽全部的資料

app.get('/', (req, res) => {
  Menu.find()
    .lean()
    .then(menus => res.render('index', { menus }))
    .catch(error => console.log(error))

})


//新增一筆資料

app.get('/menu/new', (req, res) => {


  return Menu.find()
    .lean()
    .then((menu) => res.render('new'))
    .catch(error => console.log(error))

})

app.post('/menu', (req, res) => {

  const { name, category, image } = req.body
  console.log(req.body)
  return Menu.create({ name, category, image })
    .then((menu) => res.redirect('/'))
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

//修改一筆特定資料
app.get('/menu/:id/edit', (req, res) => {

  const id = req.params.id
  return Menu.findById(id)
    .lean()
    .then(menus => res.render('edit', { menus }))
    .catch(error => console.log(error))

})


app.post('/menu/:id/edit', (req, res) => {

  const id = req.params.id
  console.log(req.body)
  const { name, category, image } = req.body


  return Menu.findById(id)
    .then(menu => {
      menu.name = name
      menu.category = category
      menu.image = image

      return menu.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

//刪除特定資料


app.post('/menu/:id/delete', (req, res) => {

  const id = req.params.id

  return Menu.findById(id)
    .then(menu => menu.remove())
    .then(() => res.redirect('/'))

    .catch(error => console.log(error))

})

app.get('/search', (req, res) => {

  const keyword = req.query.keyword

  return Menu.find()
    .lean()
    .then(menus => menus.filter(menu => {
      return menu.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || menu.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    }))

    .then((menus) => res.render('index', { menus, keyword }))
    .catch(error => console.log(error))

})



app.listen(port, () => {

  console.log(`Listenling on this local: ${port}`)
})
