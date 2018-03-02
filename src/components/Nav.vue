<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="live">live</el-menu-item>
    <el-menu-item index="game">game</el-menu-item>
    <el-menu-item index="scrollTest">scrollTest</el-menu-item>
    <el-menu-item index="other">other</el-menu-item>
    <el-submenu index="/other">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
    </el-submenu>
    <el-menu-item index="3">
      <a href="https://www.ele.me" target="_blank">订单管理</a>
    </el-menu-item>
  </el-menu>
</template>



<script>
export default {
  data() {
    return {
      activeIndex: '/'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key);
      switch (key) {
        case '/':
          this.$router.push({ path: '/' });
          break;
        case 'live':
          this.$router.push({ name: 'dataList', params: { classify: 'live' } });
          break;
        case 'game':
          this.$router.push({ name: 'dataList', params: { classify: 'game' } });
          break;
        case 'scrollTest':
          this.$router.push({ path: '/scrollTest' });
          break;
        case 'other':
          this.$router.push({ path: '/other' });
          break;
        default:
      }
    }
  }
};
</script>

<style>

</style>
