


<template>
    <div class ="loading">
        <img src="./loading.gif" width="24" height="24">
        <p class="desc">{{title}}</p>
    </div>
</template>

<script type="text/ecmascript-6">
// import BScroll from 'better-scroll'
  export default{
     props:{
      title:{
        type:String,
        default:'加载中...'
      }
     }
  }
</script>
<style type="less">
  .loading{
    width: 100%;
    text-align: center;
    .desc{
      line-height: 20px;
    }
  }
</style>
