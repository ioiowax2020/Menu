const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Menu = require('../menu')
const User = require('../user')
const db = require('../../config/mongoose')
const restaurant = require('./restaurant.json')

const restaurantList = restaurant.results

const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}, {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}
]


db.once('open', () => {

  Promise.all(Array.from(SEED_USER, (_, i) => {

    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
      .then(hash => User.create({
        name: SEED_USER[i].name,
        email: SEED_USER[i].email,
        password: hash
      }))

      .then(user => {
        const userId = user._id

        return Promise.all(Array.from({ length: 3 }, (_, i) =>
          Menu.create(
            {
              name: restaurantList[i].name,
              name_en: restaurantList[i].name_en,
              category: restaurantList[i].category,
              image: restaurantList[i].image,
              location: restaurantList[i].location,
              phone: restaurantList[i].phone,
              google_map: restaurantList[i].google_map,
              rating: restaurantList[i].rating,
              description: restaurantList[i].description,
              userId
            })
        ))
      })

  }))

    .then(() => {
      console.log('done.')
      process.exit()

    })
})