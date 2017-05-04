import { Document, Schema } from 'mongoose'
export interface ISinger extends Document {
  _id: string,
  name: string,
  name_en?: string,
  name_nick?: string,
  country?: string,
  desc?: string
}