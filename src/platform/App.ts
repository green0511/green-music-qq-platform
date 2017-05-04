import * as express from 'express'
import { RequestHandler } from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import { ISearcher } from './interfaces'
import { RouterHandler } from './RouterHandler'

export class App {

  public express: express.Application
  
  public routerHandler: RouterHandler
  constructor(
    searcher: ISearcher
  ) {
    this.routerHandler = new RouterHandler(searcher)
    this.express = express()
    this.express.all('*', function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization')
      next()
    })
    this.setMiddlewares()
    this.setRoutes()
  }

  private setMiddlewares(): void {
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
  }

  private setRoutes(): void {
  
    let router = express.Router()
    router.get('/', (req, res, next) => {
      res.json({
        date: new Date()
      })
    })

    let self = this
    this.express.use('/', router)
    router.get('/search', bind(self.routerHandler.search))

    router.get('/singers/:sid', bind(self.routerHandler.getSingerInfo))
    router.get('/singers/:sid/similar', bind(self.routerHandler.similarSinger))
    router.get('/singers/:sid/songs', bind(self.routerHandler.getSingerAllSongs))
    router.get('/singers/:sid/albums', bind(self.routerHandler.getSingerAllAlbums))

    router.get('/albums/:aid', bind(self.routerHandler.getAlbumInfo))

    router.get('/songs/:mid', bind(self.routerHandler.getSongInfo))
    
    function bind(fun: Function): RequestHandler {
      return fun.bind(self.routerHandler)
    }
  }


}
