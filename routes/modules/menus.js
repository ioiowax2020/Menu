const express = require('express')
const router = express.Router()
const Menu = require('../../models/menu')


//新增一筆資料

router.get('/new', (req, res) => {

  return res.render('new')

})

router.post('/', (req, res) => {

  const { name, category, image } = req.body

  return Menu.create({ name, category, image })
    .then((menu) => res.redirect('/'))
    .catch(error => console.log(error))

})

//瀏覽一筆資料

router.get('/:id/detail', (req, res) => {

  const id = req.params.id

  return Menu.findById(id)
    .lean()
    .then((menu) => res.render('detail', { menu }))
    .catch(error => console.log(error))

})


//修改一筆特定資料
router.get('/:id/edit', (req, res) => {

  const id = req.params.id
  return Menu.findById(id)
    .lean()
    .then(menus => res.render('edit', { menus }))
    .catch(error => console.log(error))

})


router.put('/:id', (req, res) => {

  const id = req.params.id
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

router.delete('/:id', (req, res) => {

  const id = req.params.id

  return Menu.findById(id)
    .then(menu => menu.remove())
    .then(() => res.redirect('/'))

    .catch(error => console.log(error))
  s
})

//搜尋餐廳
router.get('/search', (req, res) => {

  const keyword = req.query.keyword

  return Menu.find()
    .lean()
    .then(menus => menus.filter(menu => {
      return menu.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || menu.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    }))

    .then((menus) => res.render('index', { menus, keyword }))
    .catch(error => console.log(error))

})

//類別排序餐廳
router.get('/sort', (req, res) => {

  const sorts = req.query.sortList
  console.log(sorts)
  if (sorts === "1") {
    return Menu.find()
      .sort({ rating: -1 })
      .lean()
      .then((menus) => res.render('index', { menus }))
      .catch(error => console.log(error))
  } else if (sorts === "2") {
    return Menu.find()
      .sort({ name: 1 })
      .lean()
      .then((menus) => res.render('index', { menus }))
      .catch(error => console.log(error))



  }
})



module.exports = router