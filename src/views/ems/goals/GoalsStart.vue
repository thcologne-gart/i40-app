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
  name: 'EnergyGoals',
  data () {
    return {
      submodels: []
    }
  },
  components: { EmsChapter, EmsGrid },
  created () {
    this.submodels = [
      { id: 1, name: 'Ziele', link: '/goals-start/energy-goals' }
    ]
    this.emsChapter = { name: 'Energieziele', link: '/goals-start' }
  }
}
</script>
