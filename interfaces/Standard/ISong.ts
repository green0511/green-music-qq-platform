type ObjectId = any

export interface ISong {
  _id: ObjectId
  url: string
  name: string
  album_id: ObjectId
  singer_id: ObjectId
  interval: number
  public_time: Date
  platform: 'qq' | 'ne'
}
