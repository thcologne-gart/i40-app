<template>
    <div>
      <EmsChapter :emsChapter="emsChapter" />
      <EmsGrid :submodels="submodels"/>
    </div>
</template>

<script>
import EmsChapter from '@/components/ems/EmsChapter.vue'
import EmsGrid from '@/components/ems/EmsGrid.vue'

export default {
  components: { EmsChapter, EmsGrid },
  data () {
    return {
      submodels: []
    }
  },
  created () {
    this.submodels = [
      { id: 3, name: 'Operation' },
      { id: 4, name: 'Management' }
    ]
    this.emsChapter = { name: 'Management', link: '/management' }
  }
}
</script>
