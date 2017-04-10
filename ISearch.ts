export interface ISearch<MetaSong, MetaAlbum, MetaSinger> {
  keyword(keyword, type: 'song'): Promise<Array<MetaSong>>
  keyword(keyword, type: 'album'): Promise<Array<MetaAlbum>>
  
  singer(sid): Promise<MetaSinger>
  similarSinger(sid): Promise<Array<MetaSinger>>
  
  songs(sid): Promise<MetaSong>
  songsBySinger(sid): Promise<Array<MetaSong>>
  songsByAlbum(aid): Promise<Array<MetaSong>>
  
  albums(aid): Promise<MetaAlbum>
  albumsBySinger(sid): Promise<Array<MetaAlbum>>
}