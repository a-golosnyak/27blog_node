import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { signup, signin, protect } from './utils/auth'
import { connect } from './utils/db'
import userRouter from './resources/user/user.router'
import itemRouter from './resources/item/item.router'
import listRouter from './resources/list/list.router'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
// app.use(morgan('dev'))

// app.get('/', async ctx => (ctx.body = 'Welcome to the contacts API!'))

app.get('/', async (req, res) => {
  return res.status(200).send({message: 'Welcome to the contacts API! '})
});

app.post('/signup', signup)
app.post('/signin', signin)


app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)
app.use('/api/list', listRouter)

export const start = async () => {
  try {
    // await connect()
    console.log('___________________________________ Here 1');

    app.listen(config.port, () => {
      console.log('___________________________________ Here 2');
      // console.log(`REST API on http://localhost:${config.port}/api`)
      console.log(
      `🚀 Server ready at http://localhost:${config.port}}`
    );

      console.log('___________________________________ Here 3');
    })
  } catch (e) {
    console.log('___________________________________ Here 4');
    console.error(e)
    process.exit(1);
  }
}
