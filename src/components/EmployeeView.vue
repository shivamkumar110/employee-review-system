<template>
  <div class="employee-view-wrapper">
    <div class="employee-view-wrapper__text" v-if="!isAdminView">
      List of Assigned Reviews
    </div>
    <el-table
      border
      :data="
        userReviewList.filter(
          (data) =>
            !search || data.employeeName.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <template v-if="isAdminView">
        <el-table-column label="Name" prop="reviewerName"> </el-table-column>
        <el-table-column label="Designation" prop="reviewerDesignation"> </el-table-column>
        <el-table-column label="Feedback" prop="review"> </el-table-column>
        <el-table-column label="Rating" prop="rating"> </el-table-column>
         <el-table-column align="right">
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="Type to search" />
          </template>
          <template slot-scope="scope">
            <el-button v-if="!scope.row.reviewDate" size="mini"
                >Pending Feedback</el-button
              >
              <el-button v-else type="success" icon="el-icon-check" circle></el-button>
          </template>
        </el-table-column>
      </template>

      <template v-else>
        <el-table-column label="Name" prop="employeeName"> </el-table-column>
        <el-table-column label="Joining Date" prop="employeeJoiningDate">
          <template slot-scope="scope">
            {{new Date(scope.row.employeeJoiningDate).toLocaleString()}}
          </template>
        </el-table-column>
        <el-table-column label="Designation" prop="employeeDesignation"> </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="Type to search" />
          </template>
          <template slot-scope="scope">
            <el-button v-if="!scope.row.reviewDate" size="mini" @click="giveFeedback(scope.$index, scope.row)"
                >Give Feedback</el-button
              >
              <el-button v-else type="success" icon="el-icon-check" circle></el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'employee-view',
  props: {
    reviewData: Array,
    isAdminView: String
  },
  mounted () {
    this.getReviews({ id: this.userId, type: 'employee' })
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters('employee', ['loggedInUser']),
    ...mapGetters('review', ['reviewsList']),
    userId () {
      return this.loggedInUser.id
    },
    userReviewList () {
      return this.props?.reviewData?.length ? this.props.reviewData : this.reviewsList
    }
  },
  methods: {
    ...mapActions('review', ['getReviews']),
    giveFeedback (_, row) {
      this.$router.push({
        name: 'provideReview',
        params: { id: row.id }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.employee-view-wrapper {
  &__text {
    text-align:left;
    margin: 10px 0px;
    font-weight: 500;
  }
}
</style>
