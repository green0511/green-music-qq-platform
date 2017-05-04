import { Schema } from 'mongoose'
export const AlbumSubSchema = new Schema({
  _id: String,
  name: {
    type: String,
    required: true
  }
})