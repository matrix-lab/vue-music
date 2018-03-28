<template>
    <div class="player" v-show="playList.length > 0">
        <transition name="normal"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave"
                    @after-leave="afterLeave">
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <img width="100%" height="100%" alt="" :src="currentSong.image">
                </div>
                <div class="top">
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.singer"></h2>
                </div>
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd">
                                <img alt="" class="image" :class="cdClass" :src="currentSong.image">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="operators">
                        <div class="icon i-left">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon i-left">
                            <i class="icon-prev"></i>
                        </div>
                        <div class="icon i-center">
                            <i :class="playIcon" @click="togglePlaying"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon-next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen" @click="open">
                <div class="icon">
                    <img width="40" height="40" alt="" :class="cdClass" :src="currentSong.image">
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">
                    <i :class="miniIcon" @click.stop="togglePlaying"></i>
                    <!--click.stop 阻止冒泡-->
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <audio ref="audio" :src="currentSong.url"></audio>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapMutations} from 'vuex'
import animations from 'create-keyframe-animation' // css的动画插件
import {prefixStyle} from 'common/js/dom'

const transform = prefixStyle('transform')

export default {
  computed: {
    cdClass() {
      return this.playing ? 'play' : 'play pause'
    },
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong',
      'playing'
    ])
  },
  methods: {
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    // 使用js的钩子
    enter(el, done) {
      const {x, y, scale} = this._getPosAndScale() // 获取初始值
      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0, 0, 0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(1)`
        }
      }

      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })

      animations.runAnimation(this.$refs.cdWrapper, 'move', done) // 动画执行完执行done
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = 'all .4s'
      const {x, y, scale} = this._getPosAndScale()
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style[transform] = ''
    },
    togglePlaying() {
      this.setPlayingState(!this.playing)
    },
    _getPosAndScale() {
      const targetWidth = 40 // 左下角小图标的width
      const paddingLeft = 40
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width // 初始缩放比例
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {
        x,
        y,
        scale
      }
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
    })
  },
  watch: {
    currentSong() {
      this.$nextTick(() => { // 延迟
        this.$refs.audio.play()
      })
    },
    playing(newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => { // 延迟
        newPlaying ? audio.play() : audio.pause()
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/mixin"
    @import "~common/stylus/main"
</style>