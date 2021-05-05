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



//setting engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

//setting routing 瀏覽全部的資料

app.get('/', (req, res) => {
  Menu.find()
    .lean()
    .then(menus => res.render('index', { menus }))
    .catch(error => console.log(error))
  // res.render('index', { menuList: menuList.results })
})


<<<<<<< HEAD
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
=======
app.get('/restaurants/:menu_id', (req, res) => {

  const menuId = req.params.menu_id
  const menuListS = menuList.results.find(Menu =>
    Menu.id.toString() === menuId)

  res.render('show', { menuList: menuListS })
>>>>>>> parent of c13b745 (feat:fix seed schema,add detail page)

})

app.get('/search', (req, res) => {

  const keyword = req.query.keyword
  const searchMenu = menuList.results.filter(menu => {
    return menu.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || menu.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())

  })
  res.render('index', { menuList: searchMenu, keyword: keyword })

})

<<<<<<< HEAD
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


=======
>>>>>>> parent of c13b745 (feat:fix seed schema,add detail page)

app.listen(port, () => {

  console.log(`Listenling on this local:${port}`)
})
