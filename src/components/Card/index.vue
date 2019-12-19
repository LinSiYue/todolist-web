<template>
  <div class="card-board">
    <el-row>
      <el-col v-for="(item, index) in list" :key="item.id" :span="6" :offset="index%3 != 0 ? 2 : 0">
        <el-card class="card" :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div class="card-title">{{ item.title }}</div>
            <div class="card-center">
              <div class="card-description">Description: <br>
                <p style="text-indent:2em">{{ item.content }}</p>
              </div>
              <time class="time">{{ item.createDate }}</time>
            </div>
            <hr>
            <div class="card-bottom">
              <el-button class="card-btn"><svg-icon icon-class="peoples" /></el-button>
              <el-button class="card-btn" icon="el-icon-setting" />
              <el-button class="card-btn"><svg-icon icon-class="chart" /></el-button>
              <span class="manager-icon"><svg-icon icon-class="user" />{{ item.manager }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    list: {
      type: Array,
      default: undefined
    }
  },
  data: function() {
    return {
    }
  },
  mounted() {
    console.log(process.env.NODE_ENV)
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
