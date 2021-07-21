<template>
  <div>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Assign Reviewers for {{employeerReviewed.name}}</span>
    </div>
     <el-row>
       <el-col :span="16">
         <el-form :model="reviewForm" ref="reviewForm" label-width="120px" label-position="right">
            <el-form-item label="Select Reviewers">
              <el-select style="width:600px" v-model="reviewForm.selectedReviewers" multiple placeholder="Select Reviewers" collapse-tags>
                <el-option
                  v-for="item in employeeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Selected" v-if="reviewForm.selectedReviewers.length">
              <el-tag
                :key="reviewer.id"
                v-for="reviewer in selectedReviewers"
                closable
                :disable-transitions="false"
                @close="handleRemove(reviewer)">
                {{reviewer.name}}
              </el-tag>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">Assign Reviewers</el-button>
          </el-form-item>
        </el-form>
       </el-col>
     </el-row>
    </el-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'assign-reviewers',
  mounted () {
    this.currentUserId = this.$route.params.id
    this.fetchData()
  },
  data: () => ({
    currentUserId: '',
    reviewForm: {
      selectedReviewers: []
    },
    employeerReviewed: '',
    employeeList: []
  }),
  computed: {
    selectedReviewers () {
      return this.reviewForm.selectedReviewers.map(id => {
        return this.employeeList.filter(item => item.id === id)
      }).flat()
    }
  },
  methods: {
    ...mapActions('employee', ['getEmployee', 'listAllEployees']),
    ...mapActions('review', ['createReview']),
    handleRemove (reviewer) {
      const updatedReviewers = this.reviewForm.selectedReviewers.filter(id => reviewer.id !== id)
      this.reviewForm.selectedReviewers = updatedReviewers
    },
    handleSubmit () {
      const payload = {
        employeeID: this.currentUserId,
        reviewers: this.reviewForm.selectedReviewers
      }
      this.createReview({payload, callback: this.successCallback})
    },
    async fetchData () {
      const employeerReviewed = await this.getEmployee(this.currentUserId)
      const { data } = await this.listAllEployees()
      this.employeerReviewed = employeerReviewed.data
      this.employeeList = data.filter(e => (e.id !== this.currentUserId && e.type !== 'admin'))
    },
    successCallback () {
      this.$message({
        showClose: true,
        message: 'Review Created Successully!',
        type: 'success'
      })
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>
