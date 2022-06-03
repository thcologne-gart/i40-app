<template>
  <div>
    <div :key="submodel" v-for="submodel in submodelsJson">
        <TestSubmodel :submodel="submodel"/>
    </div>
  </div>
</template>

<script>
import TestSubmodel from '@/components/testSubmodel.vue'

export default {
  name: 'getSubmodels',
  components: { TestSubmodel },
  props: {
    submodelsJson: Array
  },
  data () {
    return {}
  }
}
</script>
