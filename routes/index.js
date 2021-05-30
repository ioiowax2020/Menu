// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 路由模組
const home = require('./modules/home')
const menus = require('./modules/menus')
const users = require('./modules/users')

router.use('/', home)
router.use('/menu', menus)
router.use('/users', users)

// 匯出路由器

module.exports = router