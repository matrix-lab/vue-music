<template>
    <scroll class="listview" ref="listview"
            :data="data"
            :listenScroll="listenScroll"
            :probeType="probeType"
            @scroll="scroll">
        <ul>
           <li v-for="group in data" class="list-group" ref="listGroup">
               <h2 class="list-group-title" :id="group.idHref">{{ group.title }}</h2>
               <ul>
                   <li v-for="item in group.items" class="list-group-item">
                       <img class="avatar" v-lazy="item.avatar">
                       <span class="name">{{ item.name }}</span>
                   </li>
               </ul>
           </li>
        </ul>
        <div class="list-shortcut" @touchstart="onShortcutTouchStart">
            <ul>
                <li v-for="(item, index) in shortcutList" class="item"
                    :class="{'current':currentIndex===index}"
                    :data-href="item.jHref"
                    :data-index="index">
                    {{ item.index }}
                </li>
            </ul>
        </div>
        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
            <div class="fixed-title">{{fixedTitle}} </div>
        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'

  export default {
    created() {
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    props: {
      data: {
        type: Array,
        default: [],
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((group) => {
          let index = group.title.substr(0, 1)

          return {
            index: index,
            jHref: '#singer_' + index
          }
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        console.log(this.scrollY);
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    data() {
      return {
        currentIndex: 0,
        scrollY: -1
      }
    },
    methods: {
      onShortcutTouchStart(e) {
        let anchorHref = getData(e.target, 'href')
        this.currentIndex = parseInt(getData(e.target, 'index'))

        window.location.hash = anchorHref

        this.scrollY = this.$refs.listview.scroll.y
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _calculteHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0

        for (let i = 0; i < list.length; i ++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }

      }
    },
    components: {
      Scroll
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculteHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        // 当滚动到顶部，newY>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]

          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    .listview
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background
        .list-group
            padding-bottom: 30px
            .list-group-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
            .list-group-item
                display: flex
                align-items: center
                padding: 20px 0 0 30px
                .avatar
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .name
                    margin-left: 20px
                    color: $color-text-l
                    font-size: $font-size-medium
        .list-shortcut
            position: fixed;
            z-index: 30
            right: 0
            top: 50%
            transform: translateY(-50%)
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background: $color-background-d
            font-family: Helvetica
            margin: auto;
            .item
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme
        .list-fixed
            position: fixed
            top: 0
            left: 0
            width: 100%
            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>
