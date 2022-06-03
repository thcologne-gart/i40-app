<template>
    <div>
      <EmsChapter :emsChapter="emsChapter" />
      <EmsGrid :submodels="submodels"/>
    </div>
</template>

<script>
import EmsChapter from '@/components/EmsChapter.vue'
import EmsGrid from '@/components/EmsGrid.vue'

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
