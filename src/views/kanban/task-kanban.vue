<template>
  <div>
    <div class="top-container">
      <el-select v-model="currentProject" filterable placeholder="Filter task" @change="filter">
        <el-option
          v-for="item in projectOptions"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </el-select>
      |
      <el-button v-if="currentProject" class="add-btn" icon="el-icon-plus" @click="addTask"/>
    </div>
    <div class="components-container board">
      <Kanban
        :key="1"
        :list="list1"
        :group="group"
        class="kanban not started"
        :header-text="'Not Started('+ (list1?list1.length:0) + ')'"
        @updateTaskData="filter"
      />
      <Kanban
        :key="2"
        :list="list2"
        :group="group"
        class="kanban todo"
        :header-text="'In Progress('+ (list2?list2.length:0) + ')'"
        @updateTaskData="filter"
      />
      <Kanban
        :key="3"
        :list="list3"
        :group="group"
        class="kanban working"
        :header-text="'Test('+ (list3?list3.length:0) + ')'"
        @updateTaskData="filter"
      />
      <Kanban
        :key="4"
        :list="list4"
        :group="group"
        class="kanban done"
        :header-text="'Done('+ (list4?list4.length:0) + ')'"
        @updateTaskData="filter"
      />
    </div>
    <drag-dialog
      :dialog-table-visible="dialogTableVisible"
      :taskId="taskId"
      :currentProject="currentProject"
      @setDialogTableVisible="setDialogTableVisible"
      @setTaskData="filter"
    />
  </div>
</template>
<script>
import Kanban from '@/components/Kanban'
import DragDialog from '@/components/DragDialog'
import { findAllProject } from '../../api/project'
import { findAllTask, findAllTaskByProjectId, updateTask } from '../../api/task'
import { deepClone } from '../../utils'

export default {
  name: 'DragKanbanDemo',
  components: {
    Kanban,
    DragDialog
  },
  data() {
    return {
      dialogTableVisible: false,
      group: 'mission',
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      projectOptions: [],
      currentProject: '',
      taskId: 0
    }
  },
  watch: {
    list1: {
      handler() {
        this.list1.forEach(item => {
          if (item.status !== 'NOT_STARTED') {
            item.status = 'NOT_STARTED'
            updateTask(item).then(response => {
              console.log('Success')
            }).catch(error => {
              alert(error)
            })
          }
        })
      },
      deep: true
    },
    list2: {
      handler() {
        this.list2.forEach(item => {
          if (item.status !== 'IN_PROGRESS') {
            item.status = 'IN_PROGRESS'
            updateTask(item).then(response => {
              console.log('Success')
            }).catch(error => {
              alert(error)
            })
          }
        })
      },
      deep: true
    },
    list3: {
      handler() {
        this.list3.forEach(item => {
          if (item.status !== 'TEST') {
            item.status = 'TEST'
            updateTask(item).then(response => {
              console.log('Success')
            }).catch(error => {
              alert(error)
            })
          }
        })
      },
      deep: true
    },
    list4: {
      handler() {
        this.list4.forEach(item => {
          if (item.status !== 'DONE') {
            item.status = 'DONE'
            updateTask(item).then(response => {
              console.log('Success')
            }).catch(error => {
              alert(error)
            })
          }
        })
      },
      deep: true
    }
  },
  mounted() {
    findAllProject().then(response => {
      if (response) {
        this.projectOptions = deepClone(response.data)
      }
    }).catch(error => {
      alert(error)
    })
  },
  methods: {
    filter() {
      this.list1 = []
      this.list2 = []
      this.list3 = []
      this.list4 = []
      findAllTaskByProjectId(this.currentProject).then(response => {
        response.data.forEach(item => {
          switch (item.status) {
            case 'NOT_STARTED':
              this.list1.push(item)
              break
            case 'IN_PROGRESS':
              this.list2.push(item)
              break
            case 'TEST':
              this.list3.push(item)
              break
            case 'DONE':
              this.list4.push(item)
              break
            default:
              break
          }
        })
      }).catch(error => {
        alert(error)
      })
    },
    setDialogTableVisible(val) {
      this.dialogTableVisible = val
    },
    addTask() {
      this.dialogTableVisible = true
      findAllTask().then(response => {
        this.taskId = response.data[response.data.length - 1].id + 1
      })
    }
  }
}
</script>
<style lang="scss">
  .board {
    margin-left: 20px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: flex-start;
  }

  .top-container {
    margin: 20px 0 10px 20px;
  }

  .add-btn {
    border-radius: 0;
    padding: 0;
    width: 35px;
    height: 35px;
  }

  input {
    border-radius: 0 !important;
  }

  .el-icon-plus {
    font-size: 18px;
    font-weight: bolder;
  }

  .components-container {
    margin: 115px 0 0 50px;
  }

  .kanban {
    &.todo {
      .board-column-header {
        background: #4A9FF9;
      }
    }
    &.working {
      .board-column-header {
        background: #f9944a;
      }
    }
    &.done {
      .board-column-header {
        background: #2ac06d;
      }
    }
  }
</style>

