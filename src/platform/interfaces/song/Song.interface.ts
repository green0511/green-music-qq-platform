import { Schema, Document } from 'mongoose'
import { IAlbum } from '../album/Album.interface'
import { ISinger } from '../singer/Singer.interface'
export interface ISong extends Document {
  _id: string
  // 播放链接
  url: string
  // 歌曲名称
  name: string
  // 时长
  interval: number
  // 发布时间
  public_time: Date
  // 去规范化
  // 专辑的 id
  // 专辑名称
  album?: IAlbum
  // // 歌手 id
  // singer_id: Schema.Types.ObjectId
  // // 歌手名称
  // singer_name: string
  singer?: ISinger[]
}