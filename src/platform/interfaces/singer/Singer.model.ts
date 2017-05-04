import { Schema, connection, Document } from 'mongoose'
import { ISinger } from './Singer.interface'
import { SingerSchema } from './Singer.schema'
export const SingerModel = connection.model<ISinger>('Singer', SingerSchema)