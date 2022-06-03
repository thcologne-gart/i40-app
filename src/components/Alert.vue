<template>
    <div>
      <b-alert dismissible fade @input="onClose" show>{{ text }}</b-alert>
    </div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>

<style>
.alert {
    border-color: red;
    border-style: thick;
    background-color: white;
    color: black;
}
.close {
    margin-right: 15px;
    background-color: white;
}
</style>
