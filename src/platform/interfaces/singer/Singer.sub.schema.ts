import { Document, Schema } from 'mongoose'

export const SingerSubSchema = new Schema({
  _id: String,
  name: {
    type: String,
    required: true
  }
})