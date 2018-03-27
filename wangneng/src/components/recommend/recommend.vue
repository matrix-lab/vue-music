<template>
        <div class="recommend">
            <Scroll ref="scroll" class="recommend-content" :data="discList">
                <div v-if="slider.length" class="slider-wrapper">
                    <slider>
                        <div v-for="item in slider">
                            <a :href="item.linkUrl">
                                <img class="" @load="loadImage" :src="item.picUrl"  alt="">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="item in discList" class="item">
                            <div class="icon">
                                <img  height="60" v-lazy="item.picurl" alt="">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.mvtitle"></h2>
                                <p class="desc" v-html="item.mvdesc"></p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="lodding-container" v-show="!discList.length">
                    <loading></loading>
                </div>
            </Scroll>
        </div>
</template>

<script >
    import Slider from "@/base/slider/slider";
    import {getRecommend,getDiscList} from "@/api/recommend";
    import {ERR_OK} from "@/api/config";
    import Scroll from "@/base/scroll/scroll";
    import Loading from "@/base/loading/loading";

    export default {
      data() {
        return {
          slider: [],
          discList:[]
        };
      },
        created(){
            this._getRecommend()
            this._getDiscList()
        },
        methods:{
            _getRecommend(){
                getRecommend().then((res)=>{
                    if(res.code===ERR_OK){
                      this.slider=res.data.slider
                      
                    }
                })
            },
            _getDiscList(){
                getDiscList().then((res)=>{
                    if(res.code===ERR_OK){
                      console.log(res.data)
                    this.discList=res.data.mvlist
                    }
                })
            },
            loadImage(){
                if(!this.checkLoaded)
                this.$refs.scroll.refresh()
                this.checkLoaded=true
            }
        },
      components:{
        Slider,
        Scroll,
        Loading
      }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    // @import "less/wn.less";
    // import '!style-loader!css-loader!less-loader!@/assets/less/wn.less'
    .recommend{
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
        .recommend-content{
            height: 100%;
            overflow: scroll;
            background: #222;
            .slider-wrapper{
                position: relative;
                width: 100%;
                overflow: hidden;

            }
            .recommend-list{
                background: #222;
                .list-title{
                    height: 65px;
                    line-height: 65px;
                    text-align: center;
                    font-size: 14px;
                    color: darkorange;
                }
                .item{
                    display: flex;
                    align-items: center;
                    padding: 0 20px 20px 20px;
                    .icon{
                        flex: 0 0 60px;
                        padding-right: 20px;
                        height: 60px;
                        width: 60px;
                        overflow: hidden;
                        margin-right: 10px;
                    }
                    .text{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        flex: 1;
                        line-height: 20px;
                        overflow: hidden;
                        .name{
                            margin-bottom: 10px;
                        }
                        .desc{
                            color: #ccc;
                        }
                    }
                }
            }
            .lodding-container{
                position: absolute;
                width: 100%;
                top:50%;
                transform: translateY(-50%);
            }
        }
    }

</style>
