<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll"  class="recommend-content" :data="discList">
        <div>
            <div class="slider-wrapper" v-if="recommends.length">
                <div class="slider-content">
                    <slider ref="slider">
                        <div v-for="item in recommends">
                            <a :href="item.linkUrl">
                                <img class="needsclick" @load="loadImage" :src="item.picUrl">
                            </a>
                        </div>
                    </slider>
                </div>
            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul>
                    <li v-for="item in discList" class="item">
                        <div class="icon">
                            <img width="60" height="60" v-lazy="item.imgurl">
                        </div>
                        <div class="text">
                            <h2 class="name" v-html="item.creator.name"></h2>
                            <p class="desc" v-html="item.dissname"></p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="loading-container" v-show="!discList.length">
            <loading></loading>
        </div>
    </scroll>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { getRecommend } from 'api/recommend'
  import { getDiscList } from 'api/recommend'
  import { ERR_OK } from 'api/config'
  export default {
    data () {
      return {
        recommends:[],
        discList:[]
      }
    },
    created () {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      _getRecommend () {
        getRecommend().then((res) => {
          if(res.code === ERR_OK){
            this.recommends = res.data.slider
          }
        });
      },
      _getDiscList () {
        getDiscList().then((res) => {
          if(res.code === ERR_OK){
            this.discList=res.data.list
          }
        });
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 20)
        }
      },
    },
    components:{
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/custom"
</style>
