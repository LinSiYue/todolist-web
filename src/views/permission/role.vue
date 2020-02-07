<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">New Role</el-button>

    <el-table :data="rolesList" style="margin-top:30px;margin-left: 50px;">
      <el-table-column align="center" label="Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Role" width="220">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Phone" width="220">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations" width="420">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="resetPassWord(scope.row.name)">reset password</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row.name)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="Avatar">
          <img :src="role.avatar" style="width: 50px;height: 50px">
        </el-form-item>
        <el-form-item label="Name" required="true">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="PassWord" required="true">
          <el-input v-model="role.passWord" type="password" placeholder="Role PassWord" />
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="role.phone" placeholder="Role Phone" />
        </el-form-item>
        <el-form-item label="Roles">
          <label>{{ role.roles }}</label>
        </el-form-item>
        <el-form-item label="Introduction">
          <el-input v-model="role.introduction" placeholder="Role Introduction" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">Cancel</el-button>
        <el-button type="primary" @click="save">Confirm</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getAll, deleteUserByName, changePassWordByName, saveUser } from '@/api/user'

const defaultRole = {
  name: '',
  passWord: '',
  phone: '',
  roles: 'editor',
  introduction: '',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
}

export default {
  data() {
    return {
      routes: [],
      rolesList: [],
      role: '',
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
    this.getAllUser()
  },
  methods: {
    getAllUser() {
      this.rolesList = []
      getAll().then(response => {
        response.data.forEach(item => {
          this.rolesList.push(item)
        })
      })
        .catch(error => {
          alert(error)
        })
    },
    handleAddRole() {
      this.role = defaultRole
      this.dialogVisible = true
    },
    handleDelete(name) {
      this.$confirm('此操作将删除用户' + name + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteUserByName(name).then(response => {
            if (response.data === name) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getAllUser()
            }
          }).catch(error => {
            alert(error)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    resetPassWord(name) {
      this.$confirm('此操作将重置用户' + name + '的密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          changePassWordByName(name, 'Lin123.').then(response => {
            if (response.data === name) {
              this.$message({
                type: 'success',
                message: '重置' + name + '的密码成功!'
              })
              this.getAllUser()
            }
          }).catch(error => {
            alert(error)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    save() {
      saveUser(this.role).then(response => {
        if (response.data) {
          this.$message({
            type: 'success',
            message: '新增用户' + response.data.name
          })
          this.dialogVisible = false
          this.getAllUser()
        }
      }).catch(error => {
        alert(error)
      })
    }
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
.el-form >>> .el-form-item__label {
  min-width: 100px;
}
.el-form >>> .el-form-item__content {
  margin-left: 100px !important;
  width: 60%;
}
</style>
