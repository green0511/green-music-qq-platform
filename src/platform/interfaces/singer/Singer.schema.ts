import { Document, Schema } from 'mongoose'

export const SingerSchema = new Schema({
  _id: String,
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: false
  },
  name_nick: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  desc: {
    type: String,
    required: false
  }
})