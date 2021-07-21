<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Provide Feedback for {{userData.name}}</span>
    </div>
    <el-form :model="feedback" ref="feedback" label-width="120px">
    <el-form-item label="Overall Rating: " prop="name">
       <el-slider
        v-model="feedback.rating"
        :max="10"
        show-input>
      </el-slider>
    </el-form-item>
    <el-form-item label="Feedback: " prop="desc">
      <el-input type="textarea" v-model="feedback.review"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitFeedback">Submit Feedback</el-button>
    </el-form-item>
  </el-form>
  </el-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'provide-review',
  data: () => ({
    id: '',
    feedback: {},
    userData: {}
  }),
  mounted () {
    this.id = this.$route.params.id
    this.fetchUserData()
  },
  computed: {
    ...mapGetters('employee', ['employee'])
  },
  methods: {
    ...mapActions('review', ['submitReview']),
    ...mapActions('employee', ['getEmployee']),
    async fetchUserData () {
      const { data } = await this.getEmployee(this.id)
      this.userData = data
    },
    submitFeedback () {
      const payload = {
        id: this.id,
        feedback: this.feedback
      }
      this.submitReview({payload, callback: this.successCallback})
    },
    successCallback () {
      this.$message({
        showClose: true,
        message: 'Review Submitted Successully!',
        type: 'success'
      })
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>
