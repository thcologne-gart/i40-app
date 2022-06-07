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
      { id: 1, name: 'Energieart', link: '/energetic-evaluation/energy-type' },
      { id: 2, name: 'Energieeinsatz', link: '/energetic-evaluation/energy-source' },
      { id: 3, name: 'Energieverbrauch', link: '/energetic-evaluation/energy-consumption' },
      { id: 4, name: 'SEU', link: '/energetic-evaluation/seu' }
    ]
    this.emsChapter = { name: 'Energetische Bewertung', link: '/evaluation-start' }
  }
}
</script>
