<template>
  <el-transfer
    v-model="value3"
    class="project-member-transfer"
    filterable
    :render-content="renderFunc"
    :titles="['Staff', 'Member']"
    :button-texts="['到左边', '到右边']"
    :format="{
      noChecked: '${total}',
      hasChecked: '${checked}/${total}'
    }"
    :data="data"
    @change="handleChange"
  />
</template>

<script>
export default {
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `成员 ${i}`
        })
      }
      return data
    }
    return {
      data: generateData(),
      value3: [1],
      renderFunc(h, option) {
        return <span>{ option.key } - { option.label }</span>
      }
    }
  },

  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
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
