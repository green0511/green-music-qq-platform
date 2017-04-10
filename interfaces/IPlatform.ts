import { ISong, IAlbum, ISinger } from './Standard'

import { IFilter } from './IFilter'
import { ISearch } from './ISearch'

type SearchResultType = 'song' | 'album'

export interface IPlatform<MetaSong, MetaAlbum, MetaSinger> {

  // GET {name}.linhao.me/singer/:sid
  getSinger(sid): ISinger

  search: ISearch<MetaSong, MetaAlbum, MetaSinger>

  filter: IFilter<MetaSong, MetaAlbum, MetaSinger>

  addSong(sid): Promise<ISong>


}