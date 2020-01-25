<template>
  <el-dialog class="dialog" :visible.sync="dialogShow" :close-on-press-escape="false" :close-on-click-modal="false">
    <div class="dashboard-editor-container">
      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="chart-wrapper">
            <pie-chart :chart-data="pieChartData" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="chart-wrapper">
            <bar-chart :chart-data="barChartData" />
          </div>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import PieChart from '../../components/Dashboard/PieChart'
import BarChart from '../../components/Dashboard/BarChart'

export default {
  name: 'Dashboard',
  components: {
    PieChart,
    BarChart
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    chartData: {
      type: Array,
      default: undefined
    }
  },
  data() {
    return {
      dialogShow: false,
      pieChartData: [],
      barChartData: []
    }
  },
  watch: {
    isShow: {
      handler() {
        this.dialogShow = this.isShow
      },
      deep: true
    },
    dialogShow: {
      handler() {
        if (this.isShow) {
          this.$emit('updateIsShowProjectDashboard', this.dialogShow)
        }
      },
      deep: true
    },
    chartData: {
      handler() {
        this.initData()
        if (this.chartData) {
          this.chartData.forEach((item, index) => {
            this.pieChartData[index].value = item.count
            this.barChartData[0].push(item.spentTime)
            this.barChartData[1].push(item.timeSheet)
          })
        }
      },
      deep: true
    }
  },
  methods: {
    initData() {
      this.pieChartData = [
        { value: 0, name: 'Not Started' },
        { value: 0, name: 'In Progress' },
        { value: 0, name: 'Test' },
        { value: 0, name: 'Done' }
      ]
      this.barChartData = [
        [],
        []
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
