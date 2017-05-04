import { Schema } from 'mongoose'
import { AlbumSubSchema } from '../album/Album.sub.schema'
import { SingerSubSchema } from '../singer/Singer.sub.schema'
export const SongSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  name: {
    type:  String,
    required: true
  },
  interval: {
    type:  Number,
    required: true
  },
  public_time: {
    type:  Date,
    required: true
  },
  _album: AlbumSubSchema,
  _singer: [SingerSubSchema]
}, {
  toObject: { getters: true, virtuals: true },
  toJSON: { getters: true, virtuals: true }
})

let songVirtual = SongSchema.virtual('album',{
  ref: 'Album',
  localField: '_album._id',
  foreignField: '_id',
  justOne: true
})

songVirtual['getters'].unshift(function(v) {
  return v || this._album 
})

let singerVirtual = SongSchema.virtual('singer',{
  ref: 'Singer',
  localField: '_singer._id',
  foreignField: '_id',
  justOne: true
})

singerVirtual['getters'].unshift(function(v) {
  return v || this._singer
})