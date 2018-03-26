<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import MHeader from  '@/components/mHeader/mHeader'
  import Tab from  '@/components/tab/tab'
  export default {
    components:{
      MHeader,
      Tab
    }
  };
</script>



<style lang="less">
  // @import "@/assets/less/reset"
  html, body, div, span, iframe,
  h1, h2, h3, h4, h5, h6, p,
  em, img,strong,var,b, i,s,
  dl, dt, dd, ol, ul, li,
  form, label,input,select,textarea,
  table, caption, tbody, tfoot, thead, tr, th, td,button
  {
    margin:0;
    padding:0;
    border:0;
    outline:none;
    font-size:100%;
    background:transparent;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: "Microsoft YaHei" !important;
  }
  ul , ol{
    list-style:none;
  }
  a{
    color:#000;
    text-decoration: none;
  }
  a img{
    border:none;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .clear:after{
    content: "";
    display: block;
    clear: both;
  }
  .imgbox{
    img{
      width: 100%;
      height: 100%;
    }
  }
    body{
        background: #222;
        color: #fff;
    }

</style>
