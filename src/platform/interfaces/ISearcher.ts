import { ISong } from './song'
import { IAlbum } from './album'
import { ISinger } from './singer'
export interface ISearcher {
  keyword(page: number, length: number, key: string, type: 'song'): Promise<Array<ISong>>
  keyword(page: number, length: number, key: string, type: 'album'): Promise<Array<IAlbum>>

  singer(sid: string): Promise<ISinger>
  similarSinger(page: number, length: number, sid: string): Promise<Array<ISinger>>
  
  song(sid): Promise<ISong>
  songsBySinger(page: number, length: number, sid: string, order?: string): Promise<Array<ISong>>
  
  album(aid): Promise<IAlbum>
  albumsBySinger(page: number, length: number, sid: string, order?: string): Promise<Array<IAlbum>>
}