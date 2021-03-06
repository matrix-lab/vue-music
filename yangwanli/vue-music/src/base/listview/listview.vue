<template>
  <scroll class="listview"
          :data="data"
          ref="listview"
          :listenScroll="listenScroll"
          :probeType="probeType"
          @scroll="scroll">
    <ul>
      <li class="list-group" v-for="group in data" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items" @click="selectItem(item)">
            <img v-lazy="item.avatar" alt="" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li class="item"
            v-for="(item,index) in shortcutList"
            :data-index="index"
            :class="{'current':currentIndex===index}">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getData} from 'common/js/dom'
  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30

  export default {
    created () {
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    data () {
      return {
        scrollY:-1,
        currentIndex:0,
        diff:-1
      }
    },
    props:{
      data:{
        type:Array,
        default:[]
      }
    },
    computed:{
      shortcutList(){
        return this.data.map((group)=>{
          return group.title.substr(0,1)
        })
      },
      fixedTitle(){
        if(this.scrollY>0){
          return ''
        }
        return this.data[this.currentIndex]?this.data[this.currentIndex].title:''
      }
    },
    methods:{
      selectItem(item){
        this.$emit('select',item)
      },
      onShortcutTouchStart(e){
        let anchorIndex = getData(e.target,'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e){
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      scroll (pos) {
        this.scrollY = pos.y
      },
      _scrollTo(index){
        if(!index && index != 0){
          return
        }
        if(index < 0){
          index = 0
        }else if(index > this.listHeight.length-2){
          index = this.listHeight.length-2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
      },
      _calculateHeight () {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for(let i=0;i<list.length;i++){
          height += list[i].clientHeight
          this.listHeight.push(height)
        }
      },
    },
    watch:{
      data () {
        setTimeout(()=>{
          this._calculateHeight()
        },20)
      },
      scrollY (newY) {
        let listHeight = this.listHeight
        //滚动到顶部时，newY>0
        if(newY>0){
          this.currentIndex = 0;
          return
        }

        //滚动到中间，this.$refs.listGroup.length=listHeight.length-1
        for(let i =0;i<listHeight.length-1;i++){
          let height1=listHeight[i]
          let height2=listHeight[i+1]
          if(-newY >= height1 && -newY < height2){
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        //滚动到底部
        this.currentIndex = listHeight.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components:{
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/custom"
</style>
