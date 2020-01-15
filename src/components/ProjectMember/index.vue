<template>
  <el-dialog class="dialog" :visible.sync="dialogShow" :close-on-press-escape="false" :close-on-click-modal="false">
    <div>
      <ul v-for="(item, index) in projectMember" :key="index">
        <li>{{ item }}</li>
      </ul>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Index',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    projectMember: {
      type: Array,
      default: undefined
    }
  },
  data() {
    return {
      dialogShow: false
    }
  },
  watch: {
    isShow: {
      handler() {
        this.dialogShow = this.isShow
      },
      deep: true
    },
    dialogShow: {
      handler() {
        if (this.isShow) {
          this.$emit('updateIsShowProjectMemberView', this.dialogShow)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
