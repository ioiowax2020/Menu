const express = require('express')
const router = express.Router()
const Menu = require('../../models/menu')


//新增一筆資料

router.get('/new', (req, res) => {

  return res.render('new')

})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, category, image, rating, location, phone, description, google_map } = req.body


  return Menu.create({ name, category, image, rating, location, phone, description, google_map, userId })
    .then((menu) => res.redirect('/'))
    .catch(error => console.log(error))

})

//瀏覽一筆資料

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Menu.findOne({ _id, userId })
    .lean()
    .then((menu) => res.render('detail', { menu }))
    .catch(error => console.log(error))

})


//修改一筆特定資料
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Menu.findOne({ _id, userId })
    .lean()
    .then(menus => res.render('edit', { menus }))
    .catch(error => console.log(error))

})


router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, image, rating, location, description, google_map } = req.body

  return Menu.findOne({ _id, userId })
    .then(menu => {
      menu.name = name
      menu.category = category
      menu.image = image
      menu.rating = rating
      menu.location = location
      menu.description = description
      menu.google_map = google_map
      return menu.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

//刪除特定資料

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Menu.findOne({ _id, userId })
    .then(menu => menu.remove())
    .then(() => res.redirect('/'))

    .catch(error => console.log(error))
  s
})

module.exports = router