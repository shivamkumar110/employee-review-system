<template>
  <div class="login-wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Login to Portal</span>
      </div>
      <el-form label-position="right" label-width="100px" :model="user">
        <el-form-item label="User ID">
          <el-input v-model="user.userId"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <el-button type="danger" @click="submitLogin"
          >Login</el-button
        >
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data: () => ({
    user: {}
  }),
  methods: {
    ...mapActions('employee', ['getLoginDetails']),
    async submitLogin () {
      await this.getLoginDetails(this.user.userId)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-wrapper {
  text-align: center;
  height:100vh;
  display: flex;
  align-items: center;
  justify-content:center;
}
.box-card{
  width: 30%;
}
</style>
