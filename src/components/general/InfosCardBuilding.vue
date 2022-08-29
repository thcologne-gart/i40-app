<template>
  <div>
    <v-card class ="mx-auto my-8" max-width="90%" elevation="2">
        <v-card-title id="card-title">{{ building.buildingDesignation }}</v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    building: Object
  }
}
</script>
