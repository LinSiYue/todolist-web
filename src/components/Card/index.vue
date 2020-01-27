<template>
  <div class="card-board">
    <div class="top-container">
      <el-button type="primary" class="add-btn" icon="el-icon-plus" @click="addProject">Add Project</el-button>
    </div>
    <el-row>
      <el-col v-for="(item, index) in list" :key="item.id" :span="6" :offset="index%3 != 0 ? 2 : 0">
        <el-card class="card" :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div class="card-title">
              {{ item.title }}
              <i v-if="$store.getters.name === item.manager" class="el-icon-delete" @click="del(item.id)" />
            </div>
            <div class="card-center">
              <div class="card-description">Description: <br>
                <p style="text-indent:2em">{{ item.description }}</p>
              </div>
              <time class="time">{{ item.createDate }}</time>
            </div>
            <hr>
            <div class="card-bottom">
              <el-button class="card-btn"><svg-icon icon-class="peoples" @click="showProjectMember(item.member)" /></el-button>
              <el-button class="card-btn" icon="el-icon-setting" @click="projectSetting(item)" />
              <el-button class="card-btn"><svg-icon icon-class="chart" @click="projectDashboard(item.id)" /></el-button>
              <span class="manager-icon"><svg-icon icon-class="user" />{{ item.manager }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <project-manage :is-show="isShowProjectManageView" :project="project" :project-member="projectMember" @updateIsShowProjectManageView="updateIsShowProjectManageView" @setProjectMembers="setProjectMembers" @setProjectSuccess="setProjectSuccess" />
    <project-member :is-show="isShowProjectMemberView" :project-member="projectMember" @updateIsShowProjectMemberView="updateIsShowProjectMemberView" />
    <project-dashboard :is-show="isShowProjectDashboard" :chart-data="chartData" @updateIsShowProjectDashboard="updateIsShowProjectDashboard" />
  </div>
</template>

<script>
import ProjectManage from '../../views/project-management/projectManage'
import ProjectMember from '../../views/project-management/basicInformation'
import ProjectDashboard from '../../views/project-management/dashboard'
import { deepClone } from '../../utils'
import { findAllTaskByProjectId } from '../../api/task'
import { deleteProject } from '../../api/project'

export default {
  name: 'Card',
  components: { ProjectManage, ProjectMember, ProjectDashboard },
  props: {
    list: {
      type: Array,
      default: undefined
    }
  },
  data: function() {
    return {
      isShowProjectManageView: false,
      isShowProjectMemberView: false,
      isShowProjectDashboard: false,
      projectMember: [],
      project: {},
      chartData: []
    }
  },
  mounted() {
    // console.log(process.env.NODE_ENV)
  },
  methods: {
    initChartData() {
      this.chartData = [
        {
          count: 0,
          spentTime: 0,
          timeSheet: 0
        },
        {
          count: 0,
          spentTime: 0,
          timeSheet: 0
        },
        {
          count: 0,
          spentTime: 0,
          timeSheet: 0
        },
        {
          count: 0,
          spentTime: 0,
          timeSheet: 0
        }
      ]
    },
    projectSetting(item) {
      this.isShowProjectManageView = true
      this.project = deepClone(item)
      this.projectMember = deepClone(item.member.split(','))
    },
    showProjectMember(member) {
      this.isShowProjectMemberView = true
      this.projectMember = deepClone(member.split(','))
    },
    projectDashboard(id) {
      this.isShowProjectDashboard = true
      this.initChartData()
      findAllTaskByProjectId(id).then(response => {
        response.data.forEach(item => {
          switch (item.status) {
            case 'NOT_STARTED':
              this.chartData[0].count += 1
              this.chartData[0].spentTime += item.spentTime
              this.chartData[0].timeSheet += item.timeSheet
              break
            case 'IN_PROGRESS':
              this.chartData[1].count += 1
              this.chartData[1].spentTime += item.spentTime
              this.chartData[1].timeSheet += item.timeSheet
              break
            case 'TEST':
              this.chartData[2].count += 1
              this.chartData[2].spentTime += item.spentTime
              this.chartData[2].timeSheet += item.timeSheet
              break
            case 'DONE':
              this.chartData[3].count += 1
              this.chartData[3].spentTime += item.spentTime
              this.chartData[3].timeSheet += item.timeSheet
              break
            default:
              break
          }
        })
      }).catch(error => {
        alert(error)
      })
    },
    updateIsShowProjectManageView(value) {
      this.isShowProjectManageView = value
    },
    updateIsShowProjectMemberView(value) {
      this.isShowProjectMemberView = value
    },
    updateIsShowProjectDashboard(value) {
      this.isShowProjectDashboard = value
    },
    setProjectMembers(val) {
      this.project.member = val
    },
    setProjectSuccess() {
      this.$emit('setProjectSuccess')
    },
    addProject() {
      this.project = { id: 0 }
      this.projectMember = []
      this.isShowProjectManageView = true
    },
    del(id) {
      this.$confirm('确认删除？')
        .then(_ => {
          deleteProject(id).then(response => {
            if (response.data === id.toString()) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.$emit('setProjectSuccess')
            } else {
              this.$message({
                type: 'info',
                message: '删除失败!'
              })
            }
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error
            })
          })
        })
        .catch(error => {
          this.$message({
            type: 'error',
            message: error
          })
        })
    }
  }
}
</script>

<style scoped>
  .card-board {
    padding: 3% 10% 0 15%;
  }

  .card {
    background-color: rgb(242, 242, 242);
    margin-bottom: 100px;
    border: 1px solid rgb(211,211,211);
  }
  .add-btn {
    border-radius: 0;
    padding: 0;
    width: 120px;
    height: 35px;
  }
  .top-container{
    width: 90%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-title {
    font-size: 16px;
    font-weight: bolder;
    color: rgb(51, 122, 183);
    margin-bottom: 20px;
  }
  .el-icon-delete{
    float: right;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .card-btn {
    background-color: rgb(242, 242, 242);
    font-size: 12px;
    border: 0;
    padding: 0;
  }

  .manager-icon {
    float: right;
    font-size: 12px;
    padding-top: 4px;
  }
</style>
