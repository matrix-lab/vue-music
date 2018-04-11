<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: false
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      }
    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
//          eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
        })
      },
      enable () {
        this.scroll && this.enable()
      },
      disable () {
        this.scroll && this.disable()
      },
      refresh () {
        this.scroll && this.refresh()
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._initScroll()
        }, 20)
      }
    }
  }

</script>