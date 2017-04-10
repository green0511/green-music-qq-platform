import { ISinger, ISong, IAlbum } from './Standard'
export interface IFilter<M, A, S> {
  getSong(song: M): ISong
  getAlbum(album: A): IAlbum
  getSinger(singer: S): ISinger
}