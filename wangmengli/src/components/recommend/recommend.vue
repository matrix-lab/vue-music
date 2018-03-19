<template>
    <div class="recommend">
        <scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
                <!--确保slider渲染成功，加v-if，v-if成功之后进行渲染-->
                <div v-if="recommends.length" class="slider-wrapper">
                    <div class="slider-content">
                        <slider>
                            <div v-for="(item, index) in recommends" :key="index">
                                <a :href="item.linkUrl">
                                    <!--needsclick解决插件之间的click冲突  添加class名needsclick-->
                                    <img @load="loadImage" :src="item.picUrl" alt="">
                                </a>
                            </div>
                        </slider>
                    </div>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li class="item" v-for="(item, index) in discList" :key="index">
                            <div class="icon">
                                <img width="60" height="60" v-lazy="item.imgurl" alt="">
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

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  components: {
    Slider,
    Scroll,
    Loading
  },
  data() {
    return {
      recommends: [],
      discList: [],
      checkLoaded: false
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    loadImage() {
      // 确保可以滚动到底部
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/main"
</style>