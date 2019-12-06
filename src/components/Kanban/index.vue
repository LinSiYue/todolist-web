<template>
  <div class="board-column">
    <div class="board-column-header">
      <input class="new-todo" maxlength="25" autocomplete="off" :placeholder="headerText" @keyup.enter="addList">
    </div>
    <draggable
      :list="list"
      v-bind="$attrs"
      class="board-column-content"
      :set-data="setData"
    >
      <div v-for="element in list" :key="element.id" class="board-item">
        {{ element.id }}<br>
        {{ element.name.length > 20 ? element.name.slice(0,20)+'...':element.name }}
        <i class="el-icon-edit" @click="dialogShow(element)" />
        <i class="el-icon-delete" style="color: red" @click="deleteList(element)" />
      </div>
      <el-dialog :visible.sync="dialogTableVisible" :before-close="handleClose">
        <span class="dialog-title">{{ dialogData.id.toString() + '\r\n' + dialogData.name }}</span>
        <div class="editor-container">
          <el-tag class="tag-title">
            I18n:
          </el-tag>
          <markdown-editor v-model="content" :language="language" height="300px" />
        </div>
        <el-button class="save-button" type="primary">save</el-button>
      </el-dialog>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import MarkdownEditor from '@/components/MarkdownEditor'

const content = `
**This is test**

* vue
* element
* webpack

`
export default {
  name: 'DragKanbanDemo',
  components: {
    draggable,
    MarkdownEditor
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
      content: content,
      dialogTableVisible: false,
      dialogData: {
        id: 0,
        name: ''
      },
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
    addList(e) {
      const text = e.target.value
      if (text.trim()) {
        this.list.push({
          name: text,
          id: Date.now(),
          flag: false
        })
        // this.setLocalStorage()
      }
      e.target.value = ''
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
      this.dialogData.id = element.id
      this.dialogData.name = element.name
      this.dialogTableVisible = true
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
    border-radius: 3px;

    .board-column-header {
      height: 50px;
      line-height: 50px;
      overflow: hidden;
      padding: 0 20px;
      text-align: center;
      background: #333;
      color: #fff;
      border-radius: 3px 3px 0 0;
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
        height: 64px;
        margin: 5px 0;
        background-color: #fff;
        text-align: left;
        line-height: 25px;
        padding: 5px 10px;
        box-sizing: border-box;
        box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
        position: relative;
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
    }
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
  /*.editor-container {*/
    /*line-height: 1.5;*/
  /*}*/
</style>

