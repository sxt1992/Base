<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="less">
html {
    font-family: Tahoma, "Microsoft YaHei", "微软雅黑", "PingFang SC", SimHei;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    width: 100%;
    height: 100%;
}
* {
    box-sizing: border-box;
}
body {
    margin: 0;
    padding: 0;
}
</style>
