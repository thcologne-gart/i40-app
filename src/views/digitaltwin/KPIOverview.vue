<template>
  <div>
    <v-btn to="/digitaltwinsoverview" variant="outline-secondary">Start</v-btn>
  </div>
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
