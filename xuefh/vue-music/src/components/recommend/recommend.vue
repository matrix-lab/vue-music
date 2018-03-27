<template>
    <div class="recommend">
        <div class="recommend-content">
            <div v-if="recommends.length" class="slider-wrapper">
                <slider>
                    <div v-for="item in recommends" :key="item.id">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl" alt="">
                        </a>
                    </div>
                </slider>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import { getRecommend } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  data () {
    return {
      recommends: []
    }
  },
  components: {
    Slider
  },
  created () {
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res)
          this.recommends = res.data.slider
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
