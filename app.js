const express = require('express')
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


const routes = require('./routes')
require('./config/mongoose')


const app = express()

//setting engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
//setting static files
app.use(express.static('public'))
//methodoverrde 設定的app.use 要放在最接近路由的地方
app.use(methodOverride('_method'))



//將request 導入路由器
app.use(routes)
app.listen(port, () => {

  console.log(`Listenling on this local:${port}`)
})
