// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Menu = require('../../models/menu')

router.get('/', (req, res) => {
  const userId = req.user._id
  Menu.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(menus => res.render('index', { menus }))
    .catch(error => console.log(error))

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