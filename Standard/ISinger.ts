type ObjectId = any

export interface ISinger {
  _id: ObjectId
  name: string
  albums: Array<ObjectId>
  platform: 'qq' | 'ne'
  platform_id: string
}
