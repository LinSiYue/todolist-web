<template>
  <div class="app-container">
    <el-button type="primary">New Role</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="Role Name" width="220">
        <template slot-scope="scope">
          {{ scope.row }}
        </template>
      </el-table-column>
    <!-- <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small">Edit</el-button>
          <el-button type="danger" size="small">Delete</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { getName } from '@/api/user'

export default {
  data() {
    return {
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  mounted() {
    // Mock: get all routes and roles list from server
    getName('_').then(response => {
      response.data.forEach(item => {
        this.rolesList.push(item)
      })
    })
      .catch(error => {
        alert(error)
      })
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
