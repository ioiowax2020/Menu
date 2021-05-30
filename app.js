const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT
const usePassport = require('./config/passport')
const routes = require('./routes')

require('./config/mongoose')


const app = express()



app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
//setting engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
//setting static files
app.use(express.static('public'))
//methodoverrde 設定的app.use 要放在最接近路由的地方
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())

//登入狀態切換導覽 passport 後,總路由前
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')

  next()
})

app.use(routes)

app.listen(port, () => {

  console.log(`Listenling on this local:${port}`)
})
