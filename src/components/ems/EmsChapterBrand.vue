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
    color: #301934;
    font-weight: 500;
}

</style>
