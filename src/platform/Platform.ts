import * as http from 'http'
import * as  mongoose from 'mongoose'
import { connect } from 'mongoose'
import * as debug from 'debug'
import { ISearcher  } from './interfaces'
import { App } from './App'

(<any>mongoose)['Promise'] = Promise

let serverDebugger = debug('ts-express:server')

interface DatabaseConfig {
  host?: string
  port?: string
  db?: string
  user?: string
  password?: string
}

export class Platform  {
  constructor(
    private name: string, 
    private config: DatabaseConfig,
    private searcher: ISearcher,
    ) { }
      
  // 启动
  bootstrap() {
    this.connectDatabase()
      .then(() => this.creatServer())
  }
  
  // 连接数据库
  connectDatabase(): Promise<null> {
    let {user, password, db = this.name, host = 'localhost:27017'} = this.config
    let auth = user && password ? `${user}:${password}@` : ``
    return new Promise((resolve, reject) => {
      connect(`mongodb://${auth}${host}/${db}`).then(() => resolve(null))
    })
  }
  
  // 创建服务器
  creatServer() {
    const app = new App(this.searcher)
    let express = app.express
    express.set('port', this.port)
      const server = http.createServer(express)
      server.listen(this.port)
      server.on('error', this.onError)
      server.on('listening', () => {
          let addr = server.address()
          let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`
          serverDebugger(`listen on ${bind}`)
      })
      serverDebugger('mongodb connected')
  }
  
  // 设置端口
  get port(): number | string | boolean {
    let val = process.env.PORT || 3000
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val
    if (isNaN(port)) {
      return val
    }
    else if (port >= 0) {
      return port
    }
    else {
      return false
    }
  }
  
  // 创建服务器的过程中出错时的处理
  onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error
    let bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`)
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`)
        process.exit(1)
        break
      default:
        throw error
    }
  }


}