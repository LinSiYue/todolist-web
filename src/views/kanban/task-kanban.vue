<template>
  <div>
    <div class="top-container">
      <el-button class="add-btn" icon="el-icon-plus" @click="addList"/>
      |
      <el-select v-model="value8" filterable placeholder="Filter task">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="components-container board">
      <Kanban
        :key="1"
        :list="list1"
        :group="group"
        class="kanban not started"
        :header-text="'Not Started('+ list1.length + ')'"
      />
      <Kanban
        :key="2"
        :list="list2"
        :group="group"
        class="kanban todo"
        :header-text="'In Progress('+ list2.length + ')'"
      />
      <Kanban :key="3" :list="list3" :group="group" class="kanban working" :header-text="'Test('+ list3.length + ')'"/>
      <Kanban :key="4" :list="list4" :group="group" class="kanban done" :header-text="'Done('+ list4.length + ')'"/>
    </div>
    <drag-dialog :dialog-table-visible="dialogTableVisible" @setDialogTableVisible="setDialogTableVisible"/>
  </div>
</template>
<script>
  import Kanban from '@/components/Kanban'
  import DragDialog from '@/components/DragDialog'

  const content = `
**This is test**

* vue
* element
* webpack

`

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
        list1: [
          {
            name: 'Mission',
            id: 1,
            content: content,
            owner: 'Reece Lin',
            pair: 'Alex Zhang',
            timeSheet: 8,
            spentTime: 0,
            fromDate: '2019-12-04 01:00:00'
          },
          {
            name: 'Mission',
            id: 2,
            content: content,
            owner: 'Reece Lin',
            pair: '',
            timeSheet: 8,
            spentTime: 0,
            fromDate: '2019-12-04 08:00:00'
          },
          {
            name: 'Mission',
            id: 3,
            content: content,
            owner: 'Reece Lin',
            pair: 'Alex Zhang',
            timeSheet: 8,
            spentTime: 0,
            fromDate: '2019-12-04 12:00:00'
          },
          {
            name: 'Mission',
            id: 4,
            content: content,
            owner: 'Reece Lin',
            pair: 'Alex Zhang',
            timeSheet: 8,
            spentTime: 0,
            fromDate: '2019-12-04 00:00:00'
          }
        ],
        list2: [
          {
            name: 'Mission',
            id: 5,
            content: content,
            owner: 'Reece Lin',
            pair: 'Alex Zhang',
            timeSheet: 8,
            spentTime: 3,
            fromDate: '2019-12-04 00:00:00'
          },
          {
            name: 'Mission',
            id: 6,
            content: content,
            owner: 'Reece Lin',
            pair: '',
            timeSheet: 8,
            spentTime: 13,
            fromDate: '2019-12-04 07:00:00'
          },
          {
            name: 'Mission',
            id: 7,
            content: content,
            owner: 'Reece Lin',
            pair: 'Alex Zhang',
            timeSheet: 8,
            spentTime: 3,
            fromDate: '2019-12-04 13:00:00'
          }
        ],
        list3: [
          {
            name: 'Mission',
            id: 8,
            content: content,
            owner: 'Reece Lin',
            pair: 'Alex Zhang',
            timeSheet: 8,
            spentTime: 15,
            fromDate: '2019-12-04 15:00:00'
          },
          {
            name: 'Mission',
            id: 9,
            content: content,
            owner: 'Reece Lin',
            pair: 'Alex Zhang',
            timeSheet: 8,
            spentTime: 10,
            fromDate: '2019-12-04 06:00:00'
          },
          {
            name: 'Mission',
            id: 10,
            content: content,
            owner: 'Reece Lin',
            pair: '',
            timeSheet: 8,
            spentTime: 3,
            fromDate: '2019-12-04 17:00:00'
          }
        ],
        list4: [
          {
            name: 'Mission',
            id: 11,
            content: content,
            owner: 'Reece Lin',
            pair: 'Alex Zhang',
            timeSheet: 8,
            spentTime: 15,
            fromDate: '2019-12-04 09:13:00'
          },
          {
            name: 'Mission',
            id: 12,
            content: content,
            owner: 'Reece Lin',
            pair: 'Alex Zhang',
            timeSheet: 8,
            spentTime: 10,
            fromDate: '2019-12-04 08:30:00'
          },
          {
            name: 'Mission',
            id: 13,
            content: content,
            owner: 'Reece Lin',
            pair: '',
            timeSheet: 8,
            spentTime: 3,
            fromDate: '2019-12-04 08:05:00'
          }
        ],
        options: [{
          value: '选项1',
          label: 'Shopping System'
        }, {
          value: '选项2',
          label: 'Todolist System'
        }, {
          value: '选项3',
          label: 'Music System'
        }],
        value8: ''
      }
    },
    methods: {
      addList(e) {
        this.dialogTableVisible = true
      },
      setDialogTableVisible(val) {
        this.dialogTableVisible = val
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

