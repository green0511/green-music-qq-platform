import { connection } from 'mongoose'
import { ISong } from './Song.interface'
import { SongSchema } from './Song.schema'
export const SongModel = connection.model<ISong>('Song', SongSchema)