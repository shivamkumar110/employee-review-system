<template>
  <div class="home-wrapper">
    <!-- <app-header/> -->
    <!-- <div class="home-wrapper__main">
      <el-row>
        <el-col :span="22" :offset="1">
          <employees-list/>
        </el-col>
      </el-row>
    </div> -->
    <employees-list/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// @ is an alias to /src
import EmployeesList from '@/components/EmployeesList'
// import AppHeader from '@/components/AppHeader'

export default {
  name: 'Home',
  components: {
    EmployeesList
  },
  computed: {
    ...mapState({
      userType: (state) => state.userType
    })
  }
}
</script>
<style lang="scss" scoped>
.home-wrapper {
  &__main {
    margin-top: 10%;
  }
}
</style>
