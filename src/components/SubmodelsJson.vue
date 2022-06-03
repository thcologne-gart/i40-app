<template>
  <div>
    <!--
    <div :key="chapterSection.idShort" v-for="chapterSection in chapterSections">
        <div v-if="chapterSection.idShort === submodels[0]">
        <submodels-name-left></submodels-name-left>
        </div>
        <div v-else-if="chapterSection.idShort === submodels[1]">
        <b-nav-item>{{ chapterSection.idShort }}</b-nav-item>
        </div>
    </div>
    //-->
    <h3>Test</h3>
    <div :key="submodelJson" v-for="submodelJson in submodelsJson">{{ submodelJson.idShort }}</div>
  </div>
</template>

<script>

export default {
  name: 'SubmodelsJson',
  props: {
    submodelsJson: Array
  },
  data () {
    return {}
  }
}
</script>
