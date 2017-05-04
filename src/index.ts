import { Platform } from './platform'
import { QmSearcher } from './QmSearcher'
let platform = new Platform('qqmusic', {
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  db: process.env.MONGO_DB_NAME,
  user: process.env.MONGO_DB_USER,
  password: process.env.MONGO_DB_PASSWORD
}, new QmSearcher())
platform.bootstrap()