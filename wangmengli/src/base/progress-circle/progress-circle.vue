<template>
    <div class="progress-circle">
        <!--viewBox="0 0 100 100"  从左上角0,0 到100,100-->
        <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"></circle>
            <!--stroke-dasharray 描边;  stroke-dashoffset 描边偏移-->
            <circle class="progress-bar"
                    r="50" cx="50" cy="50" fill="transparent"
                    :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"></circle>
        </svg>
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    radius: {
      type: Number,
      default: 100
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dashArray: Math.PI * 100 // 周长 π
    }
  },
  computed: {
    dashOffset() {
      return (1 - this.percent) * this.dashArray
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/main"
</style>