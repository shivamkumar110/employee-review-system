<template>
  <div id="app">
    <app-header v-if="loggedInUser && !isLoginPage"/>
    <div :class="{'app__main': loggedInUser}">
      <el-row>
        <el-col :span="22" :offset="1">
          <router-view/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppHeader from '@/components/AppHeader'
export default {
  name: 'app',
  components: {
    AppHeader
  },
  computed: {
    ...mapGetters('employee', ['loggedInUser']),
    isLoginPage () {
      return this.$route.name === 'Login'
    }
  }
}
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  margin-bottom: 40px;
  color: #2c3e50;
}
.app__main{
  margin-top: 10%;
}
</style>
