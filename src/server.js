import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

// router won't be able to do things like listen on a port
// for routing
// 'app' is the root router and router won't trigger unless mounted
 
const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

router.get('/me', (res, req) => {
  res.send({ me: 'hello' })
})

// you can tell express to handle routes with a simple declaring
// and pass in your own middleware or w/e
router.route('/cat')
  .get()
  .post()

router.route('/cat/:id')
  .get()
  .put()
  .delete()

// mouting router
// any route w/verb that comes in to server use this router 
// express route is 'api/me'
app.use('/api', router)

// let's make some middleware
const log = (req, res, next) => {
  console.log('logging')
  // move to the next middleware
  next()
}

app.use(log) // run middleware on server for everything


// get req for index
// pass in a callback (called a controller function), takes 3 arguments, only using 2
// you can put the middleware call on each route - see 'log'
// can also pass in an array of middleware to run

// routes can match on regex -
//  app.get('^(me)') -- will catch anthing starting with '/me'
// glob match
//  app.get('user/*') -- will catch all

// app.get('/', log, (req, res) => {
//   res.send({ message: 'hello' })
// })
app.get('/', log, (req, res) => {
  res.send({ message: 'hello' })
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({ message: 'ok' })
})



export const start = () => {
  // tell server to listen to the localhost port 3000
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
