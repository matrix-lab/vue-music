<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length>0" ref="playBtn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="bgStyle"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll class="list" @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import {prefixStyle} from 'common/js/dom'
  import Loading from 'base/loading/loading'

  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')
  export default {
    props:{
      bgImage:{
        type:String,
        default:''
      },
      songs:{
        type:Array,
        default:[]
      },
      title:{
        type:String,
        default:''
      }
    },
    computed:{
      bgStyle(){
        return `background-image:url(${this.bgImage})`
      }
    },
    data(){
      return{
        scrollY:0
      }
    },
    created(){
      this.probeType = 3
      this.listenScroll = true
    },
    mounted(){
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top=`${this.$refs.bgImage.clientHeight}px`
    },
    methods:{
      scroll(pos){
        this.scrollY=pos.y
      },
      back(){
        this.$router.back()
      }
    },
    watch:{
      scrollY(newY){
        let translateY = Math.max(this.minTranslateY,newY)
        let zIndex = 0
        let scale=1
        const percent=Math.abs(newY / this.imageHeight)
        if(newY>0){
          scale=1+percent
          zIndex=10
        }
        this.$refs.layer.style[transform]= `translate3d(0,${translateY}px,0)`
        if(newY<this.minTranslateY){
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.playBtn.style.display = 'none'
        }else{
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display = 'block'
        }
        this.$refs.bgImage.style.zIndex = zIndex
        this.$refs.bgImage.style[transform]= `scale(${scale})`
      }
    },
    components:{
      Scroll,
      SongList,
      Loading
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/custom"
</style>
