import {playMode} from 'common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false, // 全屏
  playList: [], // 播放列表
  sequenceList: [], // 歌曲列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1
}

export default state