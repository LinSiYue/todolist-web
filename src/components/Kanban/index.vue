<template>
  <div class="board-column">
    <div class="board-column-header">
      {{ headerText }}
    </div>
    <draggable
      :list="list"
      v-bind="$attrs"
      class="board-column-content"
      :set-data="setData"
    >
      <div v-for="element in list" :key="element.id" class="board-item">
        <div class="kanban-header">
          <span class="kanban-id">ID：{{ element.id }}</span>
          <span class="kanban-owner">{{ element.owner + (element.pair != ''? ',' + element.pair:'') }}</span>
        </div>
        <div class="kanban-body">
          <span class="kanban-name">{{ element.name.length > 20 ? element.name.slice(0,20)+'...':element.name }}</span>
          <i class="el-icon-edit" @click="dialogShow(element)" />
          <i class="el-icon-delete" style="color: red" @click="deleteList(element)" />
        </div>
        <div class="kanban-progress">
          <div
            class="progress-complete"
            :style="{backgroundColor:element.spentTime/element.timeSheet > 1 ? 'rgb(255,0,0)':'rgb(64,150,65)',width:(element.spentTime/element.timeSheet > 1 ? 100:element.spentTime/element.timeSheet*100)+'%'}"
          />
        </div>
        <div class="kanban-footer" :style="{color: element.spentTime/element.timeSheet > 1? 'rgb(255,0,0)':''}">
          TimeSheet: {{ element.spentTime }}h/{{ element.timeSheet }}h ({{ element.spentTime/element.timeSheet*100
          }} %used)
        </div>
      </div>
    </draggable>
    <drag-dialog :dialog-table-visible="dialogTableVisible" :dialog-data="dialogData" @setDialogTableVisible="setDialogTableVisible" @setTaskData="setTaskData" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import DragDialog from '@/components/DragDialog'

export default {
  name: 'DragKanbanDemo',
  components: {
    draggable,
    DragDialog
  },
  props: {
    headerText: {
      type: String,
      default: 'Header'
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      dialogData: {},
      languageTypeList: {
        'en': 'en_US',
        'zh': 'zh_CN',
        'es': 'es_ES'
      }
    }
  },
  computed: {
    language() {
      return this.languageTypeList['en']
    }
  },
  methods: {
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    },
    deleteList(element) {
      this.$confirm('确认删除？')
        .then(_ => {
          for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id === element.id) {
              this.list.splice(i, 1)
            }
          }
        })
        .catch(_ => {
        })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    dialogShow(element) {
      this.dialogData = element
      this.dialogTableVisible = true
    },
    setDialogTableVisible(val) {
      this.dialogTableVisible = val
    },
    setTaskData(val) {
      this.dialogData = val
      this.$emit('updateTaskData', this.dialogData)
    }
  }
}
</script>
<style lang="scss" scoped>
  .board-column {
    min-width: 300px;
    min-height: 100px;
    height: auto;
    overflow: hidden;
    background: #f0f0f0;

    .board-column-header {
      height: 50px;
      line-height: 50px;
      overflow: hidden;
      padding: 0 20px;
      background: rgb(95, 162, 221);
      color: #fff;
    }

    .board-column-content {
      height: auto;
      overflow: hidden;
      border: 10px solid transparent;
      min-height: 60px;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;

      .board-item {
        cursor: pointer;
        width: 100%;
        height: auto;
        margin: 5px 0;
        background-color: #fff;
        text-align: left;
        line-height: 25px;
        box-sizing: border-box;
        box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
        position: relative;
        border-radius: 5px;
      }
    }
  }

  .kanban-header {
    background-color: rgb(47, 113, 171);
    border-radius: 5px 5px 0 0;
    font-size: 16px;
    font-family: inherit;
    color: #ffffff;
  }

  .kanban-id {
    padding-left: 10px;
  }

  .kanban-owner {
    float: right;
    padding-right: 10px;
  }

  .kanban-body {
    padding-top: 10px;
    position: relative;
  }

  .kanban-name {
    padding-left: 10px;
  }

  .kanban-progress {
    font-size: 13px;
    background-color: rgb(240, 240, 240);
    width: 100%;
    height: 6px;
  }

  .progress-complete {
    height: 100%;
  }

  .kanban-footer {
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    padding-left: 5px;
  }

  .el-icon-delete {
    position: absolute;
    top: 35%;
    right: 5%
  }

  .el-icon-edit {
    position: absolute;
    top: 35%;
    right: 20%;
  }

  .dialog-title {
    white-space: pre-wrap;
    margin: -30px 0px 30px 0px;
    display: block;
    font-size: 18px;
  }

  .save-button {
    margin: 20px 0px 0 836px;
  }

  .new-todo {
    padding: 10px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }
</style>

