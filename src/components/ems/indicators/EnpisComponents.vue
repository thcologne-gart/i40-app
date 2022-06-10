<template>
    <div id = "header">
        <div>{{ enpiComponent }}
        </div>
        <div>{{ enpiEnergyGroup }}
        </div>
    </div>
</template>

<script>
export default {
  props: {
    enpiEnergyGroup: Object,
    enpiComponent: Object
  },
  computed: {
    wassollderscheiß () {
      console.log(this.enpiComponent)
      return this.enpiComponent
    }
  }
}
</script>
