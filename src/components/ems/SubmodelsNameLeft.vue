<template>
  <div>
    <b-nav-item id="submodel-item" v-bind:to="submodel.link" >{{ submodel.name }}</b-nav-item>
  </div>
</template>

<script>
export default {
  name: 'SubmodelNameLeft',
  props: {
    submodel: Object
  },
  data () {
    return {}
  }
  // props: ['name'],

  // template: '<h3>{{ title }}</h3>'

  // render (h) {
  // return h('b-nav-item', this.name)
  // }

}
</script>

<style scoped>
#submodel-item {
    margin-top: -5px;
    margin-bottom: -5px;;
}
.nav-item {
    border-bottom-style: solid;
    border-color: #F2F2F2;
}
</style>
