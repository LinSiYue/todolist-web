<template>
  <div class="container">
    <Card :list="list" @setProjectSuccess="setProjectSuccess" />
  </div>
</template>

<script>
import Card from '@/components/Card'
import { deepClone } from '../../utils'
import { findProjectByName } from '../../api/project'

export default {
  name: 'ProjectKanban',
  components: {
    Card
  },
  data: function() {
    return {
      list: []
    }
  },
  mounted() {
    findProjectByName(this.$store.getters.name).then(response => {
      this.list = deepClone(response.data)
    }).catch(error => {
      alert(error)
    })
  },
  methods: {
    setProjectSuccess() {
      findProjectByName(this.$store.getters.name).then(response => {
        this.list = deepClone(response.data)
      }).catch(error => {
        alert(error)
      })
    }
  }
}
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
