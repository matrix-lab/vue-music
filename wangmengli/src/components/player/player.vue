<template>
    <div class="player" v-show="playList.length > 0">
        <div class="normal-player" v-show="fullScreen">
            <div class="background">
                <img width="100%" height="100%" alt="" :src="currentSong.image">
            </div>
            <div class="top">
                <div class="back">
                    <i class="icon-back"></i>
                </div>
                <h1 class="title" v-html="currentSong.name"></h1>
                <h2 class="subtitle" v-html="currentSong.singer"></h2>
            </div>
            <div class="middle">
                <div class="middle-l">
                    <div class="cd-wrapper">
                        <div class="cd">
                            <img alt="" class="image" :src="currentSong.image">
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="operators">
                    <div class="icon i-left">
                        <i class="icon-sequence"></i>
                    </div>
                    <div class="icon i-left">
                        <i class="icon-prev"></i>
                    </div>
                    <div class="icon i-center">
                        <i class="icon-play"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon-next"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon-not-favorite"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="mini-player" v-show="!fullScreen">
            <div class="icon">
                <img width="40" height="40" alt="" :src="currentSong.image">
            </div>
            <div class="text">
                <h2 class="name" v-html="currentSong.name"></h2>
                <p class="desc" v-html="currentSong.singer"></p>
            </div>
            <div class="control"></div>
            <div class="control">
                <i class="icon-playlist"></i>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong'
    ])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/mixin"
    @import "~common/stylus/main"
</style>