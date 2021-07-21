<template>
<div>
   <el-card class="box-card">
     <div slot="header" class="clearfix">
      <span>Employee Information</span>
    </div>
    <el-form label-position="right" label-width="100px" :model="employeeInfo">
    <el-form-item label="Name">
      <el-input v-model="employeeInfo.name" :disabled="isViewOnly"></el-input>
    </el-form-item>
    <el-form-item label="Designation">
      <el-input v-model="employeeInfo.designation" :disabled="isViewOnly"></el-input>
    </el-form-item>
    <el-form-item label="Joining Date">
      <el-date-picker
        v-model="employeeInfo.joiningDate"
        type="date"
        value-format="timestamp"
        :disabled="isViewOnly"
        placeholder="Pick a date">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="Type">
      <el-radio-group v-model="employeeInfo.type" :disabled="isViewOnly">
        <el-radio label="admin"></el-radio>
        <el-radio label="employee"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button v-if="!isViewOnly" type="primary" @click="handleCreateEmployee">
        {{isEditOnly ? 'Update' : 'Create'}} Employee
      </el-button>
    </el-form-item>
  </el-form>
  </el-card>
  <el-card class="box-card" style="margin-top: 40px" v-if="isViewOnly">
    <div slot="header" class="clearfix">
      <span>Feedbacks Recieved</span>
    </div>
    <employee-view :review-data="reviewsList" is-admin-view="true"/>
  </el-card>

</div>

</template>
<script>
import EmployeeView from './EmployeeView'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'employee-info',
  components: {
    EmployeeView
  },
  data: () => ({
    action: '',
    employeeInfo: {
      name: '',
      designation: '',
      joiningDate: null
    }
  }),
  mounted () {
    this.action = this.$route.params.action
    if (['view', 'edit'].includes(this.action)) {
      this.fetchUserData()
    }
  },
  computed: {
    ...mapGetters('review', ['reviewsList']),
    isViewOnly () {
      return this.action === 'view'
    },
    isEditOnly () {
      return this.action === 'edit'
    }
  },
  methods: {
    ...mapActions('employee', ['getEmployee', 'createEmployee', 'updateEmployee']),
    ...mapActions('review', ['getReviews']),
    handleCreateEmployee () {
      if (this.action === 'edit') {
        this.updateEmployee({ payload: this.employeeInfo, callback: this.successCallback })
        return
      }
      this.createEmployee({ payload: this.employeeInfo, callback: this.successCallback })
    },
    async fetchUserData () {
      const { data } = await this.getEmployee(this.$route.params.id)
      this.employeeInfo = data
      if (this.isViewOnly) {
        await this.getReviews({ id: this.$route.params.id, type: 'admin' })
      }
    },
    successCallback () {
      const action = this.action === 'edit' ? 'Updated' : 'Created'
      this.$message({
        showClose: true,
        message: `User ${action} Successully!`,
        type: 'success'
      })
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>
