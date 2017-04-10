import { IPlatform } from './IPlatform'
import { IQmAlbum, IQmSinger, IQmSong } from './QmTypes'
import { IAlbum, ISinger, ISong } from './Standard'
import { ISearch } from './ISearch'
import { IFilter } from './IFilter'
class QmPlatform implements IPlatform<IQmSong, IQmAlbum, IQmSinger>{

  // GET {name}.linhao.me/singer/:sid
  getSinger(sid): ISinger {
    return 
  }

  search: ISearch<IQmSong, IQmAlbum, IQmSinger>

  filter: IFilter<IQmSong, IQmAlbum, IQmSinger>

  addSong(sid): Promise<ISong> {
    this.search.songs(sid)
      .then(searchResult => {
        let song = this.filter.getSong(searchResult)
      })
    return 
  }
}

