<template>
    <div id = "header">
        <b-row>
            <h4>{{ submodelName }}</h4>
        </b-row>
    </div>
</template>

<script>

export default {
  name: 'SubmodelHeader',
  props: {
    submodelName: String
  }
}
</script>

<style scoped>
#header {
    margin-top: 15px;
    color: #025939;
}
</style>
