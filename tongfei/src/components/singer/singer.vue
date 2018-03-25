<template>
    <div class="singer">
        <listview :data="singers"></listview>
    </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from "api/singer";
  import {ERR_OK} from "api/config";
  import Singer from "common/js/singer"
  import Listview from 'base/listview/listview'

  const HOT_NAME = '热门'
  const HOT_SINGER_LENGTH = 10

  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._formtSingers(res.data.list)
          }
        })
      },
      _formtSingers(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }

        list.forEach((singer, index) => {
          if (index < HOT_SINGER_LENGTH) {
            map.hot.items.push(new Singer ({
              id: singer.Fsinger_mid,
              name: singer.Fsinger_name,
            }))
          }

          const key = singer.Findex

          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }

          map[key].items.push(new Singer({
            id: singer.Fsinger_mid,
            name: singer.Fsinger_name,
          }))
        })
        // 获取有序列表
        let hot = []
        let ret = []

        for (let key in map) {
          let val = map[key]
          val.idHref = 'singer_' + val.title

          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        // 排序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })

        return hot.concat(ret)
      }
    },
    components: {
      Listview
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>