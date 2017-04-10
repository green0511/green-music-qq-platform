import * as path from 'path'
import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'

class App<M, A, S>{

  public express: express.Application

  constructor() {
    this.express = express()
    this.express.all('*', function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization')
      next()
    })
    this.middleware()
    this.routes()
  }

  private middleware(): void {
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
  }

  private routes(): void {

    let router = express.Router()
    router.get('/', (req, res, next) => {
      res.json({
        date: new Date()
      })
    })

    router.get('/')
    this.express.use('/', router)
  }

}

export default new App().express