<template>
    <div id = "sticky-ems-chapter">
        <b-navbar id="navbar-chapter" toggleable="md">
            <b-row>
                <b-col md = "2">
                    <div class="d-none d-lg-block" id="chapterName">
                        <EmsChapterBrand :emsChapter="emsChapter" />
                    </div>
                </b-col>
                <b-col md = "10" id="chapter">
                    <b-navbar-toggle target="chapter-collapse" class="row"></b-navbar-toggle>
                    <b-collapse id="chapter-collapse" is-nav>
                        <b-navbar-nav class="mx-auto">
                            <b-nav-item><b-button id="btn-ems-chapter" variant="outline-warning" to="/context">1</b-button></b-nav-item>
                            <b-nav-item><b-button id="btn-ems-chapter" variant="outline-warning" to="/management">2</b-button></b-nav-item>
                            <b-nav-item><b-button id="btn-ems-chapter" variant="outline-warning" to="/ressources">3</b-button></b-nav-item>
                            <b-nav-item><b-button id="btn-ems-chapter" variant="outline-warning" to="/energetic-evaluation">4</b-button></b-nav-item>
                            <b-nav-item><b-button id="btn-ems-chapter" variant="outline-warning" to="/energy-performance-indicator">5</b-button></b-nav-item>
                            <b-nav-item><b-button id="btn-ems-chapter" variant="outline-warning" to="/energy-goals">6</b-button></b-nav-item>
                            <b-nav-item><b-button id="btn-ems-chapter" variant="outline-warning" to="/competence">7</b-button></b-nav-item>
                            <b-nav-item><b-button id="btn-ems-chapter" variant="outline-warning" to="/operation">8</b-button></b-nav-item>
                            <b-nav-item><b-button id="btn-ems-chapter" variant="outline-warning" to="/buying">9</b-button></b-nav-item>
                            <b-nav-item><b-button id="btn-ems-chapter" variant="outline-warning" to="/communication">10</b-button></b-nav-item>
                            <b-nav-item><b-button id="btn-ems-chapter" variant="outline-warning" to="/analysis">11</b-button></b-nav-item>
                            <b-nav-item><b-button id="btn-ems-chapter" variant="outline-warning" to="/optimization">12</b-button></b-nav-item>
                        </b-navbar-nav>
                    </b-collapse>
                </b-col>
            </b-row>
        </b-navbar>
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
    color: #025939;
}
.navbar-nav {
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
}

</style>
