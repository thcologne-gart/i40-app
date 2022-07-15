<template>
    <div>{{ test }}</div>
</template>

<script>
export default {
  props: {
    aas: Object,
    aasId: String,
    aasInfo: Object
  },
  computed: {
    test () {
      console.log(this.aasInfo)
      const dudu = 1
      return dudu
    }
  }
}
</script>
