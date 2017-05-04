import { Schema, connection, Document } from 'mongoose'
import { SongSubSchema } from '../song/Song.sub.schema'
import { SingerSubSchema } from '../singer'
export const AlbumSchema = new Schema({
  _id: String,
  name: {
    type: String,
    required: true
  },
  songs: [SongSubSchema],
  public_date: {
    type: Date,
    required: false
  },
  company: {
    type: String,
    required: false
  },
  desc: {
    type: String,
    required: false
  },
  _singer: SingerSubSchema
}, {
  toObject: { getters: true, virtuals: true },
  toJSON: { getters: true, virtuals: true }
})
AlbumSchema.virtual('count')
  .get(function() {
    return this.songs ? this.songs.length : 0
  })

let virtual = AlbumSchema.virtual('singer',{
  ref: 'Singer',
  localField: '_singer._id',
  foreignField: '_id',
  justOne: true
})

virtual['getters'].unshift(function(v) {
  return v || this._singer 
})