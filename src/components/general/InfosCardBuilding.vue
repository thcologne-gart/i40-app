<template>
  <div>
    <v-card>
        <v-card-title>{{ building.buildingDesignation }}</v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    building: Array
  }
}
</script>
