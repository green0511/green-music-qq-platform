type ObjectId = any

export interface IAlbum {
  _id: ObjectId
  name: string
  singer_id: ObjectId
  songs: Array<ObjectId>
  public_time: Date
  platform: 'qq' | 'ne'
  platform_id: string
}
