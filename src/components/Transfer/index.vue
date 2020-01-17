<template>
  <el-transfer
    v-model="value3"
    filterable
    :filter-method="filterMethod"
    filter-placeholder="select member"
    :data="member"
  />
</template>

<script>
import { getName } from '../../api/user'

export default {
  data() {
    return {
      member: [],
      value3: []
    }
  },
  mounted() {
    getName('_').then(response => {
      if (response.data) {
        response.data.forEach((item, index) => {
          this.member.push({
            label: item,
            key: index,
            filter: item
          })
        })
      }
    }).catch(error => {
      alert(error)
    })
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    filterMethod(query, item) {
      return item.filter.toLowerCase().indexOf(query.toLowerCase()) > -1
    }
  }
}
</script>

<style scoped>
  .project-member-transfer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
</style>
