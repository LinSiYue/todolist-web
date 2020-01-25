<template>
  <el-dialog class="dialog" title="Project Setting" :visible.sync="dialogShow" :close-on-press-escape="false" :close-on-click-modal="false">
    <div>
      <div class="setting-part-title">
        <div class="blue-block" />
        <span>Member setting</span>
      </div>
      <el-transfer
        v-model="projectMembers"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="select member"
        :data="member"
        :render-content="renderFunc"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        @change="handleChange"
      />
    </div>
    <div>
      <el-button @click="save">Save</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getName } from '../../api/user'
import { saveProject } from '../../api/project'
export default {
  props: {
    projectMember: {
      type: Array,
      default: undefined
    },
    isShow: {
      type: Boolean,
      default: false
    },
    project: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      member: [],
      projectMembers: [],
      renderFunc(h, option) {
        return <span>{ option.key } - { option.label }</span>
      },
      dialogShow: false,
      currentComponent: 'ProjectMember',
      activeName: 'first'
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
    },
    projectMember: {
      handler() {
        this.projectMembers = []
        this.member.forEach(item => {
          this.projectMember.forEach(member => {
            if (item.label === member) {
              this.projectMembers.push(item.key)
            }
          })
        })
      },
      deep: true
    },
    projectMembers: {
      handler() {
        var members = ''
        this.member.forEach(item => {
          this.projectMembers.forEach(member => {
            if (item.key === member) {
              members += item.label + ','
            }
          })
        })
        members = members.substring(0, members.lastIndexOf(','))
        this.$emit('setProjectMembers', members)
      },
      deep: true
    }
  },
  mounted() {
    getName('_').then(response => {
      if (response.data) {
        response.data.forEach((item, index) => {
          this.member.push({
            key: index,
            label: item,
            filter: item
          })
          this.projectMember.forEach(member => {
            if (item === member) {
              this.projectMembers.push(index)
            }
          })
        })
      }
    }).catch(error => {
      alert(error)
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    save() {
      this.$confirm('此操作将更改任务内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          saveProject(this.project).then(response => {
            this.dialogShow = false
            this.$emit('setProjectSuccess')
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
          }).catch(error => {
            alert(error)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          })
        })
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    filterMethod(query, item) {
      return item.filter.toLowerCase().indexOf(query.toLowerCase()) > -1
    }
  }
}
</script>

<style scoped>
.project-member-transfer {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.dialog >>> .el-dialog__title{
  margin-bottom: 20px;
  font-size: 30px;
}
.setting-part-title{
  font-size: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}
.blue-block{
  width: 5px;
  height: 27px;
  background-color: #1682e6;
  margin-right: 10px;
  float: left;
}
</style>
