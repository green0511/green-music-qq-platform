import { Schema, connection, Document } from 'mongoose'
import { IAlbum } from './Album.interface'
import { AlbumSchema } from './Album.schema'
export const AlbumModel = connection.model<IAlbum>('Album', AlbumSchema)