// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Menu = require('../../models/menu')

router.get('/', (req, res) => {

  Menu.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(menus => res.render('index', { menus }))
    .catch(error => console.log(error))

})



module.exports = router