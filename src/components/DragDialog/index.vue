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
              clearable
              :remote-method="searchUser"
              class="card-data"
              placeholder="Select Owner"
              @focus="clearOptions"
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
      <div class="dialog-footer-btn">
        <el-button type="primary" @click="saveData">save</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import { getName } from '../../api/user'
import { deepClone } from '../../utils'
import { updateTask } from '../../api/task'
import { arrayToString, dateFormat } from '../../utils/data-convertor'

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
    },
    taskId: {
      type: Number,
      default: 0
    },
    currentProject: {
      default: ''
    }
  },
  data: function() {
    return {
      dialogShow: false,
      languageTypeList: {
        en: 'en_US',
        zh: 'zh_CN',
        es: 'es_ES'
      },
      originalData: {},
      cardData: {
        id: this.taskId,
        name: '',
        content: '',
        owner: '',
        pair: '',
        timeSheet: 0,
        spentTime: 0,
        fromDate: '',
        status: 'NOT_STARTED',
        parentProjectId: this.currentProject
      },
      options: []
    }
  },
  computed: {
    language() {
      return this.languageTypeList['en']
    }
  },
  watch: {
    dialogTableVisible: {
      handler() {
        this.dialogShow = this.dialogTableVisible
        if (this.dialogData === undefined && this.dialogTableVisible === true) {
          this.cardData.id = JSON.parse(
            JSON.stringify(this.$store.getters.taskId)
          )
        }
      },
      deep: true
    },
    dialogData: {
      handler() {
        // 解决父组件和子组件数据双向绑定问题
        if (this.dialogData) {
          this.cardData = deepClone(this.dialogData)
          if (this.cardData.owner) {
            this.cardData.owner = this.cardData.owner.split(',')
          }
        }
      },
      deep: true
    },
    taskId: {
      handler() {
        this.cardData.id = this.taskId
      },
      deep: true
    },
    currentProject: {
      handler() {
        this.cardData.parentProjectId = this.currentProject
      },
      deep: true
    }
  },
  mounted() {
    this.originalData = deepClone(this.cardData)
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.$emit('setDialogTableVisible', this.dialogShow)
        })
        .catch(_ => {
        })
    },
    saveData() {
      this.$confirm('此操作将更改任务内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var updateData = deepClone(this.cardData)
          updateData.owner = arrayToString(updateData.owner)
          updateData.fromDate = dateFormat(this.cardData.fromDate)
          updateTask(updateData).then(response => {
            this.$emit('setTaskData')
            this.dialogShow = false
            this.$emit('setDialogTableVisible', this.dialogShow)
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            this.cardData = deepClone(this.originalData)
          }).catch(error => {
            alert(error)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          })
        })
    },
    searchUser(query) {
      this.options = []
      if (query !== '') {
        getName(query).then(response => {
          if (response && response.data.length > 0) {
            response.data.forEach(item => {
              this.options.push({ name: item, value: item })
            })
          }
        }).catch(error => {
          alert(error)
        })
      }
    },
    clearOptions() {
      this.options = []
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

  .dialog-footer-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
</style>
