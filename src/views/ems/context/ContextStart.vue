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
  name: 'Organization',
  data () {
    return {
      submodels: []
    }
  },
  components: { EmsChapter, EmsGrid },
  created () {
    this.submodels = [
      { id: 1, name: 'Unternehmen', link: '/contextstart/organization' },
      { id: 2, name: 'Standorte', link: '/contextstart/sites' },
      { id: 3, name: 'Gebäude', link: '/contextstart/buildings' }
    ]
    this.emsChapter = { name: 'Kontext', link: '/contextstart' }
  }
}
</script>
