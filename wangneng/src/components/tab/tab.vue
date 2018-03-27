<template>
    <div class="tab">
        <router-link tag="div" class="tab-item" to="/recommend">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/singer">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/rank">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/search">
            <span class="tab-link">搜索</span>
        </router-link>

    </div>
</template>

<script>
  export default {
    name: 'Tab',
  }
</script>

<style lang="less">
    .tab{
        display: flex;
        height: 44px;
        .tab-item{
            flex: 1;
            text-align: center;
            .tab-link{
                padding-bottom: 5px;
                color: #fff;
            }
            &.router-link-active{
                .tab-link{
                    padding-bottom: 5px;
                    color: darkorange;
                    border-bottom: 2px solid darkorange;
                }
            }
        }
    }
</style>