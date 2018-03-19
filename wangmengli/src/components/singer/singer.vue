<template>
    <div class="singer">
        <list-view @select="selectSinger" :data="singers"></list-view>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'

import {mapMutations} from 'vuex'

const HOT_NAME = '热门' // 定义一个热门常量
const HOT_SINGER_LEN = 10 // 热门数量

export default {
  components: {
    ListView
  },
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })

      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) { // 规范数据
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      // 同样的代码复用 new Singer
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }

        // 聚类
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // console.log(map)

      // 为了得到有序列表，需要处理 map
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else {
          hot.push(val)
        }
      }
      // 排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER' // 映射
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer
        width: 100%
        position: fixed
        top: 88px
        bottom: 0
</style>