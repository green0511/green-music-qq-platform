import { connect, disconnect, connection, createConnection, Connection } from 'mongoose'
import { expect } from 'chai'
import { setUp, tearDown, resetDb } from './DatabaseUtils'
import { AlbumModel, SongModel } from '../src/platform'


describe('测试 ODM 模块', () =>　{
  before(setUp)
  after(tearDown)
  afterEach(resetDb)

  it('测试专辑外键', (done) => {
    AlbumModel.create({name: '测试专辑', public_time: new Date('2017-01-01')})
      .then((album) => {
        SongModel.create({
          name: '测试歌曲',
          url: 'http://url.mp3',
          interval: 300,
          public_time: new Date(),
          _album: album
        })
        .then(song => {
          return Promise.all([
            SongModel.findById(song).populate('album'),
            SongModel.findById(song)
          ])
        })
        .then(res => {
          res.forEach(item => {
            console.log(item.album)
            expect(true).to.be.true
          })
        })
        .catch(err => {
          console.log(err)
          expect(true).to.be.false
        })
        .then(() => done())
      })
  })
})