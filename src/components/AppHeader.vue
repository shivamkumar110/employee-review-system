<template>
  <div class="header-wrapper">
    <div class="header-wrapper__title">
       Employee Review System
    </div>
    <div class="header-wrapper__user">
      Welcome {{loggedInUser.name}}
      <el-button @click="handleLogout" type="plain">Logout</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'app-header',
  computed: {
    ...mapGetters('employee', ['loggedInUser'])
  },
  methods: {
    ...mapMutations('employee', ['SET_LOGIN_DETAILS']),
    handleLogout () {
      this.SET_LOGIN_DETAILS(null)
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper {
  position: absolute;
  display: flex;
  justify-content: space-between;
  color: #fff;
  top: 0;
  z-index: 2;
  width: 100vw;
  height: 80px;
  background-color: #409eff;
  &__title {
    padding: 20px;
    font-size: 1.4rem;
    font-weight: 500;
  }
  &__user {
     padding: 20px;
  }
}
</style>
