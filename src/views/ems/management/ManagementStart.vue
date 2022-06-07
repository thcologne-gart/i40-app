<template>
    <div>
      <EmsChapter :emsChapter="emsChapter" />
      <EmsGrid :submodels="submodels">
          <div>Platzhalter
          </div>
      </EmsGrid>
    </div>
</template>

<script>
import EmsChapter from '@/components/ems/EmsChapter.vue'
import EmsGrid from '@/components/ems/EmsGrid.vue'

export default {
  name: 'Management',
  data () {
    return {
      submodels: []
    }
  },
  components: { EmsChapter, EmsGrid },
  created () {
    this.submodels = [
      { id: 1, name: 'Operation', link: '' },
      { id: 2, name: 'Management', link: '' }
    ]
    this.emsChapter = { name: 'Management', link: '/management-start' }
  }
}
</script>
