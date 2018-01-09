
<template>
  <div id="app">
    <navBar></navBar> 
    <router-view/>
  </div>
</template>

<script>
import navBar from '@/components/Nav';
import restCss from '@/common/rest.css'
export default {
  name: 'app',
  components:{
    navBar
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
