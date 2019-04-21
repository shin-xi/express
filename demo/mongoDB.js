const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// 连接mongodb
mongoose.connect('mongodb://localhost/test') // test是数据库名称

// 实例化连接对象
const db = mongoose.connection
db.on('error', console.error.bind(console, '连接错误：'))
db.once('open', (callback) => {
  console.log('MongoDB连接成功！！')
})

const kittySchema = mongoose.Schema({
  name: String
})

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  let greeting = this.name ? 'Meow name is ' + this.name : "I don't have a name"
  console.log(greeting)
}

const Kitten = mongoose.model('Kitten', kittySchema)

const silence = new Kitten({ name: 'Silence' })
console.log(silence.name) // 'Silence'

const fluffy = new Kitten({ name: 'fluffy' })
fluffy.speak() // "Meow name is fluffy"

// add
// fluffy.save((err, fluffy) => {
//     if (err) return console.error(err);
//     fluffy.speak();
// });

// find
// Kitten.find((err, kittens) => {
//     if (err) return console.error(err);
//     console.log(kittens);
// });

// Kitten.find({ name: /^fluff/ }, (err, kittens) => {
//     if (err) return console.error(err);
//     console.log(kittens);
// });

router.get('/person', (req, res) => {
  console.log(req.query.name)
  let name = req.query.name

  Kitten.find({ name }, (err, kittens) => {
    if (err) return console.error(err)
    console.log(kittens)
    res.json(kittens)
  })
})

module.exports = router
