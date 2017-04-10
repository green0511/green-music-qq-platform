export interface ISearch<MetaSong, MetaAlbum, MetaSinger> {
  keyword(page: number, length: number, key: string, type: 'song'): Promise<Array<MetaSong>>
  keyword(page: number, length: number, key: string, type: 'album'): Promise<Array<MetaAlbum>>

  // singer(sid): Promise<MetaSinger>
  similarSinger(sid, page: number, length: number): Promise<Array<MetaSinger>>
  
  song(sid): Promise<MetaSong>
  songsBySinger?: (sid)=> Promise<Array<MetaSong>>
  
  album(aid): Promise<MetaAlbum>
  albumsBySinger(sid: string, page: number, length: number, order: string): Promise<Array<MetaAlbum>>
}