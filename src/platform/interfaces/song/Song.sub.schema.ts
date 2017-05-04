import { Schema } from 'mongoose'
export const SongSubSchema = new Schema({
  _id: String,
  name: {
    type: String,
    required: true
  }
})