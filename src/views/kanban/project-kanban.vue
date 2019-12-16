<template>
  <div class="container">
    <Card />
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'ProjectKanban',
  components: {
    Card
  },
  data: function() {
    return {
      currentDate: new Date()
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
