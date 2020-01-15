<template>
  <div class="container">
    <Card :list="list" />
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
      list: [
        {
          id: 0,
          title: 'Testing project1',
          content: 'This is a testing project!',
          manager: 'Reece Lin',
          member: ['Reece Lin'],
          timeSheet: '',
          createDate: new Date()
        },
        {
          id: 1,
          title: 'Testing project2',
          content: 'This is a testing project!',
          manager: 'Reece Lin',
          member: ['Reece Lin', 'Alex Zhang'],
          timeSheet: '',
          createDate: new Date()
        },
        {
          id: 2,
          title: 'Testing project3',
          content: 'This is a testing project!',
          manager: 'Reece Lin',
          member: ['Reece Lin'],
          timeSheet: '',
          createDate: new Date()
        },
        {
          id: 3,
          title: 'Testing project4',
          content: 'This is a testing project!',
          manager: 'Reece Lin',
          member: ['Reece Lin', 'Alex Zhang'],
          timeSheet: '',
          createDate: new Date()
        },
        {
          id: 4,
          title: 'Testing project5',
          content: 'This is a testing project!',
          manager: 'Reece Lin',
          member: ['Reece Lin', 'Alex Zhang'],
          timeSheet: '',
          createDate: new Date()
        },
        {
          id: 5,
          title: 'Testing project6',
          content: 'This is a testing project!',
          manager: 'Reece Lin',
          member: ['Reece Lin', 'Alex Zhang'],
          timeSheet: '',
          createDate: new Date()
        },
        {
          id: 6,
          title: 'Testing project7',
          content: 'This is a testing project!',
          manager: 'Reece Lin',
          member: ['Reece Lin', 'Alex Zhang'],
          timeSheet: '',
          createDate: new Date()
        }
      ]
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
