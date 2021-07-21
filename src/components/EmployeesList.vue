<template>
  <div>
    <template v-if="userType === 'admin'">
      <admin-view />
    </template>
    <template v-else>
      <employee-view />
    </template>

  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import AdminView from './AdminView'
import EmployeeView from './EmployeeView'

export default {
  name: 'employees-list',
  components: {
    AdminView,
    EmployeeView
  },
  computed: {
    ...mapGetters('employee', ['loggedInUser']),
    userType () {
      return this.loggedInUser.type
    }
  }
}
</script>
