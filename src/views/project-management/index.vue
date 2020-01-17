<template>
  <div>
    <el-tabs v-model="activeName" class="project-member-tab" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <keep-alive>
          <project-member />
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ProjectMember from './components/ProjectMember'
export default {
  name: 'Index',
  components: {
    ProjectMember
  },
  data() {
    return {
      currentComponent: 'ProjectMember',
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>
.project-member-tab{
  margin: 4% 100px 0 100px;
}
</style>
