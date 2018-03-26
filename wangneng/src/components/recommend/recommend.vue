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
                                <img width="60" height="60" v-lazy="item.picUrl" alt="">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.songListAuthor"></h2>
                                <p class="desc" v-html="item.songListDesc"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </Scroll>
        </div>
</template>

<script >
    import Slider from "@/base/slider/slider";
    import {getRecommend} from "@/api/recommend";
    import {ERR_OK} from "@/api/config";
    import Scroll from "@/base/scroll/scroll";

    export default {
      data() {
        return {
          slider: [],
          discList:[{
            accessnum:8014255,
            album_pic_mid:"",
            id:"2646688496",
            picUrl:"http://p.qpic.cn/music_cover/1Fr9IFMhWDPeUzWKVEjn3QTL2eX2QziaJmaL0ZAmsvtW71ic9IDUoYzg/300?n=1",
            pic_mid:"00333So02drvak",
            songListAuthor:"Harry",
            songListDesc:"催泪大杀器！盘点演唱会经典万人大合唱"
          },{
              accessnum:639211,
              album_pic_mid:"",
              id:"1144416825",
              picUrl:"http://p.qpic.cn/music_cover/z8wAFqicQ1qhImeiajkrgiaR4hYM3pzsUULFnicXshFXdw9uGkm261Ex9g/300?n=1",
              pic_mid:"0013j8zs1jRnLQ",
              songListAuthor:"草地",
              songListDesc:"纳尼？这些华语歌手竟然会唱日语歌！"
          },{
            accessnum:8014255,
            album_pic_mid:"",
            id:"2646688497",
            picUrl:"http://p.qpic.cn/music_cover/1Fr9IFMhWDPeUzWKVEjn3QTL2eX2QziaJmaL0ZAmsvtW71ic9IDUoYzg/300?n=1",
            pic_mid:"00333So02drvak",
            songListAuthor:"Harry",
            songListDesc:"催泪大杀器！盘点演唱会经典万人大合唱"
          },{
            accessnum:639211,
            album_pic_mid:"",
            id:"1144416828",
            picUrl:"http://p.qpic.cn/music_cover/z8wAFqicQ1qhImeiajkrgiaR4hYM3pzsUULFnicXshFXdw9uGkm261Ex9g/300?n=1",
            pic_mid:"0013j8zs1jRnLQ",
            songListAuthor:"草地",
            songListDesc:"纳尼？这些华语歌手竟然会唱日语歌！"
          },{
            accessnum:8014255,
            album_pic_mid:"",
            id:"2646688491",
            picUrl:"http://p.qpic.cn/music_cover/1Fr9IFMhWDPeUzWKVEjn3QTL2eX2QziaJmaL0ZAmsvtW71ic9IDUoYzg/300?n=1",
            pic_mid:"00333So02drvak",
            songListAuthor:"Harry",
            songListDesc:"催泪大杀器！盘点演唱会经典万人大合唱"
          },{
            accessnum:639211,
            album_pic_mid:"",
            id:"1144416822",
            picUrl:"http://p.qpic.cn/music_cover/z8wAFqicQ1qhImeiajkrgiaR4hYM3pzsUULFnicXshFXdw9uGkm261Ex9g/300?n=1",
            pic_mid:"0013j8zs1jRnLQ",
            songListAuthor:"草地",
            songListDesc:"纳尼？这些华语歌手竟然会唱日语歌！"
          }
          ]
        };
      },
        created(){
            this._getRecommend()
        },
        methods:{
            _getRecommend(){
                getRecommend().then((res)=>{
                    if(res.code===ERR_OK){
                      console.log(res.data.slider)
                      this.slider=res.data.slider
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
        Scroll
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
            .slider-wrapper{
                position: relative;
                width: 100%;
                overflow: hidden;

            }
            .recommend-list{
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
