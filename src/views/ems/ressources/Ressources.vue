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
  components: { EmsChapter, EmsGrid },
  data () {
    return {
      submodels: []
    }
  },
  created () {
    this.submodels = [
      { id: 1, name: 'Beauftragte' }
    ]
    this.emsChapter = { name: 'Ressourcen', link: '/ressources' }
  }
}
</script>
