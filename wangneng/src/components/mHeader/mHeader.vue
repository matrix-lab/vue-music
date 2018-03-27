<template>
  <div class="m-header">
    <div class="icon"></div>
    <div class="text">Chicken Music</div>
  </div>
</template>

<script>
export default {
  name: 'MHeader',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .m-header{
    position: relative;
    height: 44px;
    text-align: center;
    font-size: 12px;
    .icon{
      display: inline-block;
      vertical-align: top;
      margin-top: 6px;
      width: 30px;
      height: 32px;
      margin-right: 9px;
      background-image: url("../../assets/images/default.png");
      background-size: 30px 32px;
    }
    .text{
      display: inline-block;
      vertical-align: top;
      line-height: 44px;
      font-size: 12px;
      color: darkorange;
    }
  }

</style>
