<template>
  <div ref="wrapper">
      <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props:{
      probeType:{
        type:Number,
        default:1 //1 滚动的时候会派发scroll事件，会截流。   2 滚动的时候实时派发scroll事件，不会截流    3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
      },
      click:{
        type:Boolean,
        default:false
      },
      data:{
        type:Array,
        default:null
      }
    },
    data () {
      return {

      }
    },
    mounted () {
      setTimeout(()=>{
       this._initScroll()
      },20)
    },
    methods:{
      _initScroll () {
        if(!this.$refs.wrapper){
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType: this.probeType,
          click:this.click
        })
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/custom"
</style>
