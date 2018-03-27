<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup" >
            <slot>

            </slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="item in dots"></span>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import {addClass} from "../../common/js/dom";
    export default {
      data(){
        return{
          dots:[]
        }
      },
      props:{
        loop:{
          type:Boolean,
          default:false
        },
        autoPlay:{
          type:Boolean,
          default:true
        },
        interval:{
          type:Number,
          default:4000
        },
      },
      mounted(){
        setTimeout(()=>{
          this._setSliderWidth();
          this._initSlider();
        },20)
         window.addEventListener('resize', () => {
            if (!this.slider) {
            return
          }
          this._setSliderWidth(true)
          this.slider.refresh()
        })
      },
      methods:{
        _setSliderWidth(){
          this.children=this.$refs.sliderGroup.children;
          let width=0;
          let sliderWidth=this.$refs.slider.clientWidth;
          for (let i=0;i<this.children.length;i++){
            let child=this.children[i]
            addClass(child,'slider-item')
            child.style.width=sliderWidth+'px';
            width+=sliderWidth;
          }
          if(this.loop){
            width+=2*sliderWidth;
          }
          this.$refs.sliderGroup.style.width=width+'px'
        },
        _initDots(){
          this.children=this.$refs.sliderGroup.children;
          this.dots=new Array(this.children.length)
        },
        _initSlider(){
            this.slider= new BScroll(this.$refs.slider,{
              scrollX:true,
              scrollY:true,
              momentum:false,
              snap:true,
              snapLoop:this.loop,
              snapThreshold:0.3,
              snapSpeed:400,
              click:true
            })
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .slider{
        min-height: 1px;
        .slider-group{
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            .slider-item{
                float: left;
                overflow: hidden;
                text-align: center;
                a{
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    text-decoration: none;
                }
                img{
                    display: block;
                    width: 100%;
                }
            }
        }
        .dots{
            position: absolute;
            right: 0;
            left: 0;
            bottom: 12px;
            text-align: center;
            font-size: 0;
            .dot{

            }
        }
    }

</style>