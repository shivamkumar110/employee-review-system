<template>
  <div class="admin-view-wrapper">
    <el-button class="add-employee-btn" type="primary" @click="handleAddEmployee">Add New Employee</el-button>

    <div class="admin-view-wrapper__text">
      List of Employees
    </div>
    <el-table
      border
      :data="
        employeesList.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="EmployeeID" prop="id" width="120"> </el-table-column>
      <el-table-column label="Name" prop="name"> </el-table-column>
      <el-table-column label="Joining Date" prop="created">
      </el-table-column>
      <el-table-column label="Designation" prop="designation"> </el-table-column>
      <el-table-column align="right" width="380">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <div v-if="userId !== scope.row.id">
            <el-button v-if="scope.row.type !== 'admin'" size="mini" type="success" @click="handleAssignFeedback(scope.$index, scope.row)"
                  >Assign Feedback</el-button
                >
              <el-button v-if="scope.row.type !== 'admin'" size="mini"  type="info" @click="handleView(scope.$index, scope.row)"
                  >View</el-button
                >
                <el-button v-if="scope.row.type !== 'admin'" size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"
                  >Edit</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >Delete</el-button
                >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'admin-view',
  mounted () {
    this.listAllEployees()
  },
  data: () => ({
    search: ''
  }),
  computed: {
    ...mapGetters('employee', ['loggedInUser', 'employeesList']),
    userId () {
      return this.loggedInUser.id
    }
  },
  methods: {
    ...mapActions('employee', ['listAllEployees', 'deleteEmployee']),
    handleEdit (_, row) {
      this.$router.push({
        name: 'employeeInfo',
        params: {
          id: row.id,
          action: 'edit'
        }
      })
    },
    handleView (_, row) {
      this.$router.push({
        name: 'employeeInfo',
        params: {
          id: row.id,
          action: 'view'
        }
      })
    },
    handleAssignFeedback (_, row) {
      this.$router.push({
        name: 'assignReviewers',
        params: { id: row.id }
      })
    },
    handleDelete (_, row) {
      this.deleteEmployee({ id: row.id, callback: this.successCallback })
    },
    successCallback () {
      this.$message({
        showClose: true,
        message: 'User Deleted Successully!',
        type: 'success'
      })
      this.listAllEployees()
    },
    handleAddEmployee () {
      this.$router.push({
        name: 'createEmployee'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.admin-view-wrapper {
  .add-employee-btn{
    margin: 10px 0px;
  }
  &__text {
    text-align:left;
    margin: 10px 0px;
    font-weight: 500;
  }
}
</style>
