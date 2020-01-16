<template>
  <div>
    <el-dialog class="dialog" :visible.sync="dialogShow" :before-close="handleClose">
      <el-form class="dialog-form" :model="cardData" label-position="left" label-width="70px">
        <span class="dialog-title">ID: {{ cardData.id }}</span>
        <el-form-item label="Title" prop="title">
          <el-input v-model="cardData.title" class="card-data-title" maxlength="30" />
        </el-form-item>
        <el-form-item label="TimeSheet" prop="timestamp">
          <el-col :span="11">
            <el-input v-model="cardData.timeSheet" class="card-data" maxlength="3" />
          </el-col>
          <el-col :span="11">
            <label class="dialog-label">Date</label>
            <el-date-picker
              v-model="cardData.fromDate"
              class="card-data"
              type="datetime"
              placeholder="Please pick a date"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="Owner" prop="title">
          <el-col :span="11">
            <el-select
              v-model="cardData.owner"
              multiple
              filterable
              remote
              :remote-method="searchUser"
              :loading="loading"
              reserve-keyword
              class="card-data"
              placeholder="Select Owner"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-form-item>
        <div class="editor-container">
          <el-tag class="tag-title">I18n:</el-tag>
          <markdown-editor v-model="cardData.content" :language="language" height="300px" />
        </div>
      </el-form>
      <el-button class="save-button" type="primary" @click="saveData">save</el-button>
    </el-dialog>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'

const content = `
**This is test**

* vue
* element
* webpack

`
export default {
  name: 'Index',
  components: {
    MarkdownEditor
  },
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
      default: undefined
    }
  },
  data: function() {
    return {
      content: content,
      dialogShow: false,
      languageTypeList: {
        en: 'en_US',
        zh: 'zh_CN',
        es: 'es_ES'
      },
      cardData: {
        id: JSON.parse(JSON.stringify(this.$store.getters.taskId)),
        name: '',
        content: content,
        owner: '',
        pair: '',
        timeSheet: 0,
        spentTime: 0,
        fromDate: ''
      },
      options: [
        {
          value: '选项1',
          label: 'Reece Lin'
        },
        {
          value: '选项2',
          label: 'Alex Zhang'
        },
        {
          value: '选项3',
          label: 'John Huang'
        }
      ]
    }
  },
  computed: {
    language() {
      return this.languageTypeList['en']
    },
    getDialogTableVisible() {
      return this.dialogTableVisible
    },
    getDialogData() {
      return this.dialogData
    }
  },
  watch: {
    getDialogTableVisible: function() {
      this.dialogShow = this.dialogTableVisible
      if (this.dialogData === undefined && this.dialogTableVisible === true) {
        this.cardData.id = JSON.parse(
          JSON.stringify(this.$store.getters.taskId)
        )
      }
    },
    getDialogData: function() {
      // 解决父组件和子组件数据双向绑定问题
      this.cardData = JSON.parse(JSON.stringify(this.dialogData))
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.$emit('setDialogTableVisible', this.dialogShow)
        })
        .catch(_ => {})
    },
    saveData() {
      this.$confirm('此操作将更改任务内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('setTaskData', this.cardData)
          this.dialogShow = false
          this.$emit('setDialogTableVisible', this.dialogShow)
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          })
        })
    },
    searchUser() {
    }
  }
}
</script>

<style scoped>
.dialog {
  margin-top: -2%;
}

.dialog-title {
  white-space: pre-wrap;
  margin: -30px 0px 30px 0px;
  display: block;
  font-size: 18px;
}

.dialog-form {
  width: 94%;
  margin-left: 3%;
}

.card-data {
  margin-left: 15px;
  width: 65.7%;
}

.card-data-title {
  width: 30%;
  margin-left: 15px;
}

.dialog-label {
  width: 70px;
}

.save-button {
  margin: 20px 0px 0 836px;
}
</style>
