<template>
    <b-navbar-brand id="ems-chapter-brand" v-bind:to="emsChapter.link">{{ emsChapter.name }}</b-navbar-brand>
</template>

<script>
export default {
  name: 'EmsChapterBrand',
  props: {
    emsChapter: Object
  },
  data () {
    return {}
  }
}
</script>
<style scoped>
#ems-chapter-brand {
    margin-right: -1rem;
    color:#025939;
}

</style>
