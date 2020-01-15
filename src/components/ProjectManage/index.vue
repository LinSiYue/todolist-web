<template>
  <el-dialog class="dialog" :visible.sync="dialogShow" :close-on-press-escape="false" :close-on-click-modal="false">
    <div>
      <project-management />
    </div>
  </el-dialog>
</template>
<script>
import ProjectManagement from '../../views/project-management/index'
export default {
  name: 'IndexVue',
  components: { ProjectManagement },
  props: {
    isShow: {
      type: Boolean,
      default: false
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
          this.$emit('updateIsShowProjectManageView', this.dialogShow)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
