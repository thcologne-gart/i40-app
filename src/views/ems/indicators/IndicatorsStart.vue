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
      { id: 1, name: 'EnPis Heizung', link: '/energy-performance-indicator/heating' },
      { id: 2, name: 'EnPis Lüftung', link: '/energy-performance-indicator/air' },
      { id: 3, name: 'EnPis Strom', link: '/energy-performance-indicator/electricity' }
    ]
    this.emsChapter = { name: 'Energieleistungskennzahlen', link: '/indicators-start' }
  }
}
</script>
