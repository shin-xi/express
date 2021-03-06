const express = require('express')
const router = express.Router()
const mockData = require('./mockData/dataDemo')
const chinaAreaData = require('./mockData/chinaAreaData')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const path = require('path')

// 挂载至 /book 的中间件，任何指向 /book 的请求都会执行它
router.use('/mock', (req, res, next) => {
  console.log('Request Type:', req.method)
  res.setHeader('x-powered-by', 'mock')
  next()
})

router.route('/mock')
  .get((req, res) => {
    res.json(mockData.data)
  })
  .post((req, res) => {
    res.json(mockData.data)
  })

const configJson = {
  normal: {
    message: '',
    count: Math.trunc(Math.random() * 1000),
    time: ''
  },
  map: {
    point: [121.436525, 31.158523]
  },
  chart: {
    bar: [
      ['product', '2015', '2016', '2017'],
      ['Matcha Latte', 43.3, 85.8, 93.7],
      ['Milk Tea', 83.1, 73.4, 55.1],
      ['Cheese Cocoa', 86.4, 65.2, 82.5],
      ['Walnut Brownie', 72.4, 53.9, 39.1]
    ]
  },
  list: {
    week: [
      ['表头1', '表头2'],
      [1, 2],
      [3, 4]
    ]
  }
}

router.route('/configJson/:id')
  .get((req, res) => {
    // console.log(req.params.id);
    configJson.normal.time = Date.now()
    configJson.normal.count = Math.trunc(Math.random() * 1000)
    configJson.normal.message = '配置' + req.params.id
    res.json({
      id: req.params.id,
      ...configJson
    })
  })

router.route('/street')
  .get((req, res) => {
    const code = req.query.code
    const data = chinaAreaData.filter(v => +v.parent_id === +code).map(v => {
      return {
        value: '' + v.id,
        label: v.name
      }
    })

    res.json({
      data
    })
  })

// 压力测试demon
router.post('/api/amcid/7/debts', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body)
  res.json(req.body)
})

const options = {
  root: path.join(__dirname, '/public/'),
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
}

router.route('/getExcel')
  .get((req, res, next) => {
    res.sendFile('demo.xlsx', options, (err) => {
      if (err) {
        next(err)
      } else {
        console.log('Sent:', 'demo.xlsx')
      }
    })
  })
  .post((req, res, next) => {
    res.sendFile('demo.xlsx', options, (err) => {
      if (err) {
        next(err)
      } else {
        console.log('Sent:', 'demo.xlsx')
      }
    })
  })

router.route('/login')
  .post((req, res) => {
    res.json({
      msg: 'ok'
    })
  })

module.exports = router
