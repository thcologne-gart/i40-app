<template>
    <div id = "header">
        <div>{{ enpiComponent }}
        </div>
    </div>
</template>

<script>
export default {
  props: {
    enpiEnergyGroup: Object,
    enpiComponent: Array
  },
  computed: {
    wassollderscheiß () {
      console.log(this.enpiComponent)
      return this.enpiComponent
    }
  }
}
</script>
