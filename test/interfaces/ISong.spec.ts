import { Song, ISong } from '../../src/platform/interfaces'
import { IAlbum, AlbumModel, Album } from '../../src/platform/interfaces'
import { Schema } from 'mongoose'
import { expect } from 'chai'
import { setUp, tearDown, resetDb } from '../DatabaseUtils'

describe('测试歌曲模块', () => {
  before(setUp)
  after(tearDown)
  afterEach(resetDb)
  let album = {
    name: 'test album',
    public_time: new Date('2017-01-01')
  }
  let song = {
    _id: new Schema.Types.ObjectId('1234'),
    url: 'http://abc.com',
    name: 'test',
    interval: 300,
    public_time: new Date(),
    album: album
  }
  it('新建歌曲', (done) => {
    Song.save(song)
      .then(savedSong => {
        console.log(savedSong)
        expect(true).to.be.true
        done()
      })
      .catch(err => console.log(err))
  })
})