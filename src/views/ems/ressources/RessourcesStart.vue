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
  name: 'Ressources',
  data () {
    return {
      submodels: []
    }
  },
  components: { EmsChapter, EmsGrid },
  created () {
    this.submodels = [
      { id: 1, name: 'Beauftragte', link: '' }
    ]
    this.emsChapter = { name: 'Ressourcen', link: '/ressources-start' }
  }
}
</script>
