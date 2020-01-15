<template>
  <div class="card-board">
    <el-row>
      <el-col v-for="(item, index) in list" :key="item.id" :span="6" :offset="index%3 != 0 ? 2 : 0">
        <el-card class="card" :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div class="card-title">{{ item.title }}</div>
            <div class="card-center">
              <div class="card-description">Description: <br>
                <p style="text-indent:2em">{{ item.description }}</p>
              </div>
              <time class="time">{{ item.createDate }}</time>
            </div>
            <hr>
            <div class="card-bottom">
              <el-button class="card-btn"><svg-icon icon-class="peoples" @click="showProjectMember(item.member)" /></el-button>
              <el-button class="card-btn" icon="el-icon-setting" @click="projectSetting()" />
              <el-button class="card-btn"><svg-icon icon-class="chart" /></el-button>
              <span class="manager-icon"><svg-icon icon-class="user" />{{ item.manager }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <project-manage :is-show="isShowProjectManageView" @updateIsShowProjectManageView="updateIsShowProjectManageView" />
    <project-member :is-show="isShowProjectMemberView" :project-member="projectMember" @updateIsShowProjectMemberView="updateIsShowProjectMemberView" />
  </div>
</template>

<script>
import ProjectManage from '../ProjectManage/index'
import ProjectMember from '../ProjectMember/index'
import { deepClone } from '../../utils'
export default {
  name: 'Card',
  components: { ProjectManage, ProjectMember },
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
      projectMember: []
    }
  },
  mounted() {
    // console.log(process.env.NODE_ENV)
  },
  methods: {
    projectSetting() {
      this.isShowProjectManageView = true
    },
    showProjectMember(member) {
      this.isShowProjectMemberView = true
      this.projectMember = deepClone(member.split(','))
    },
    updateIsShowProjectManageView(value) {
      this.isShowProjectManageView = value
    },
    updateIsShowProjectMemberView(value) {
      this.isShowProjectMemberView = value
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

  .card-title {
    font-size: 16px;
    font-weight: bolder;
    color: rgb(51, 122, 183);
    margin-bottom: 20px;
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
