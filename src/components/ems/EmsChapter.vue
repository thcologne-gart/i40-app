<template>
    <div id = "sticky-ems-chapter">
        <v-app-bar
            color="grey lighten-5"
            >
            <v-row id="ems-chapter">
                <v-col md = "2">
                    <div class="d-none d-lg-block" id="chapterName">
                        <EmsChapterBrand :emsChapter="emsChapter" />
                    </div>
                </v-col>
                <v-col md = "10" id="chapter">
                            <v-btn outlined color="grey" active-class="active-chapter-button" id="btn-ems-chapter" to="/contextstart">1</v-btn>
                            <v-btn outlined color="grey" active-class="active-chapter-button" id="btn-ems-chapter" to="/management-start">2</v-btn>
                            <v-btn outlined color="grey" active-class="active-chapter-button" id="btn-ems-chapter" to="/ressources-start">3</v-btn>
                            <v-btn outlined color="grey" active-class="active-chapter-button" id="btn-ems-chapter" to="/evaluation-start">4</v-btn>
                            <v-btn outlined color="grey" active-class="active-chapter-button" id="btn-ems-chapter" to="/indicators-start">5</v-btn>
                            <v-btn outlined color="grey" active-class="active-chapter-button" id="btn-ems-chapter" to="/goals-start">6</v-btn>
                            <v-btn outlined color="grey" active-class="active-chapter-button" id="btn-ems-chapter" to="/competence">7</v-btn>
                            <v-btn outlined color="grey" active-class="active-chapter-button" id="btn-ems-chapter" to="/operation">8</v-btn>
                            <v-btn outlined color="grey" active-class="active-chapter-button" id="btn-ems-chapter" to="/buying">9</v-btn>
                            <v-btn outlined color="grey" active-class="active-chapter-button" id="btn-ems-chapter" to="/communication">10</v-btn>
                            <v-btn outlined color="grey" active-class="active-chapter-button" id="btn-ems-chapter" to="/analysis">11</v-btn>
                            <v-btn outlined color="grey" active-class="active-chapter-button" id="btn-ems-chapter" to="/optimization">12</v-btn>
                </v-col>
            </v-row>
        </v-app-bar>
    </div>
</template>

<script>
import EmsChapterBrand from '@/components/ems/EmsChapterBrand.vue'
export default {
  name: 'EmsChapter',
  components: { EmsChapterBrand },
  props: {
    emsChapter: Object
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.row {
    margin-left: -5px;
}
#navbar-chapter {
    display: inline;
}
#chapterName {
    margin-top: 12px;
}
#btn-ems-chapter {
    margin-right: 10px;
    background:white;
}
.active-chapter-button {
    color: #FFAC1C !important;
}
.navbar-nav {
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
}

</style>
