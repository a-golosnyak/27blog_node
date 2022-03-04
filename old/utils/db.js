import mongoose from 'mongoose'
import options from '../../backend/src/config/index'

export const connect = (url = options.dbUrl, opts = {}) => {
  return mongoose.connect(
    url,
    { ...opts, useNewUrlParser: true, useUnifiedTopology: true  }
  )
}
