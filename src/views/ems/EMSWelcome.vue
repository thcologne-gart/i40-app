<template>
    <div>
        <div id = "header">
            <b-row>
                <h4>Energiemanagementsystem nach DIN EN ISO 50001</h4>
            </b-row>
        </div>
        <b-container id="points">
            <b-card-group>
                <b-card v-bind:title = points[0].name :img-src= points[0].pic img-top class="shadow p-3 mb-5 bg-white rounded">
                    <hr>
                    <b-card-text>
                        Gebäude sind für <b>40 %</b> des gesamten Energieverbrauchs und <b>36 %</b> aller Treibhausgasemissionen verantwortlich.
                    </b-card-text>
                </b-card>
                <b-card v-bind:title = points[1].name :img-src= points[1].pic img-top class="shadow p-3 mb-5 bg-white rounded">
                    <hr>
                    <b-card-text>
                        Nach dem Green Deal der EU sollen die Treibhausgase bis 2030 gegenüber 1990 um <b>55 %</b> reduziert werden.
                    </b-card-text>
                </b-card>
                <b-card v-bind:title = points[2].name :img-src= points[2].pic img-top class="shadow p-3 mb-5 bg-white rounded">
                    <hr>
                    <b-card-text>
                        Die Renovierungsrate von Gebäuden innerhalb der EU liegt momentan bei rund <b>1 %</b>.
                    </b-card-text>
                </b-card>
                <b-card v-bind:title = points[3].name :img-src= points[3].pic img-top class="shadow p-3 mb-5 bg-white rounded">
                    <hr>
                    <b-card-text>
                        Durch die Einführung eines Energiemanagement Systems kann im Durchschnitt <b>30 %</b> der Energie eingespart werden.
                    </b-card-text>
                </b-card>
            </b-card-group>
        </b-container>
        <b-container fluid>
            <b-row>
                <b-col md>
                    <div class="container" v-b-hover="handleHover0">
                        <b-link v-bind:to = elements[0].link>
                            <b-img v-if="isHovered0" class="grey" :src= elements[0].pic fluid></b-img>
                            <b-img v-else :src= elements[0].pic fluid></b-img>
                            <h5 v-if="isHovered0" class="centered">Kontext der Organisation</h5>
                        </b-link>
                    </div>
                </b-col>
                <b-col md>
                    <div class="container" v-b-hover="handleHover1">
                        <b-link v-bind:to = elements[1].link>
                            <b-img v-if="isHovered1" class="grey" :src= elements[1].pic fluid></b-img>
                            <b-img v-else :src= elements[1].pic fluid></b-img>
                            <h5 v-if="isHovered1" class="centered">Management</h5>
                        </b-link>
                    </div>
                </b-col>
                <b-col md>
                    <div class="container" v-b-hover="handleHover2">
                        <b-link v-bind:to = elements[2].link>
                            <b-img v-if="isHovered2" class="grey" :src= elements[2].pic fluid></b-img>
                            <b-img v-else :src= elements[2].pic fluid></b-img>
                            <h5 v-if="isHovered2" class="centered">Ressourcen</h5>
                        </b-link>
                    </div>
                </b-col>
                <b-col md>
                    <div class="container" v-b-hover="handleHover3">
                        <b-link v-bind:to = elements[3].link>
                            <b-img v-if="isHovered3" class="grey" :src= elements[3].pic fluid></b-img>
                            <b-img v-else :src= elements[3].pic fluid></b-img>
                            <h5 v-if="isHovered3" class="centered">Energetische Bewertung</h5>
                        </b-link>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col md>
                    <div class="container" v-b-hover="handleHover4">
                        <b-link v-bind:to = elements[4].link>
                            <b-img v-if="isHovered4" class="grey" :src= elements[4].pic fluid></b-img>
                            <b-img v-else :src= elements[4].pic fluid></b-img>
                            <h5 v-if="isHovered4" class="centered">Energieleistungskennzahlen</h5>
                        </b-link>
                    </div>
                </b-col>
                <b-col md>
                    <div class="container" v-b-hover="handleHover5">
                        <b-link v-bind:to = elements[5].link>
                            <b-img v-if="isHovered5" class="grey" :src= elements[5].pic fluid></b-img>
                            <b-img v-else :src= elements[5].pic fluid></b-img>
                            <h5 v-if="isHovered5" class="centered">Energieziele</h5>
                        </b-link>
                    </div>
                </b-col>
                <b-col md>
                    <div class="container" v-b-hover="handleHover6">
                        <b-link v-bind:to = elements[6].link>
                            <b-img v-if="isHovered6" class="grey" :src= elements[6].pic fluid></b-img>
                            <b-img v-else :src= elements[6].pic fluid></b-img>
                            <h5 v-if="isHovered6" class="centered">Kompetenz und Bewusstsein</h5>
                        </b-link>
                    </div>
                </b-col>
                <b-col md>
                    <div class="container" v-b-hover="handleHover7">
                        <b-link v-bind:to = elements[7].link>
                            <b-img v-if="isHovered7" class="grey" :src= elements[7].pic fluid></b-img>
                            <b-img v-else :src= elements[7].pic fluid></b-img>
                            <h5 v-if="isHovered7" class="centered">Betrieb und Wartung</h5>
                        </b-link>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col md>
                    <div class="container" v-b-hover="handleHover8">
                        <b-link v-bind:to = elements[8].link>
                            <b-img v-if="isHovered8" class="grey" :src= elements[8].pic fluid></b-img>
                            <b-img v-else :src= elements[8].pic fluid></b-img>
                            <h5 v-if="isHovered8" class="centered">Beschaffung und Auslegung</h5>
                        </b-link>
                    </div>
                </b-col>
                <b-col md>
                    <div class="container" v-b-hover="handleHover9">
                        <b-link v-bind:to = elements[9].link>
                            <b-img v-if="isHovered9" class="grey" :src= elements[9].pic fluid></b-img>
                            <b-img v-else :src= elements[9].pic fluid></b-img>
                            <h5 v-if="isHovered9" class="centered">Kommunikation</h5>
                        </b-link>
                    </div>
                </b-col>
                <b-col md>
                    <div class="container" v-b-hover="handleHover10">
                        <b-link v-bind:to = elements[10].link>
                            <b-img v-if="isHovered10" class="grey" :src= elements[10].pic fluid></b-img>
                            <b-img v-else :src= elements[10].pic fluid></b-img>
                            <h5 v-if="isHovered10" class="centered">Messung und Analyse</h5>
                        </b-link>
                    </div>
                </b-col>
                <b-col md>
                    <div class="container" v-b-hover="handleHover11">
                        <b-link v-bind:to = elements[11].link>
                            <b-img v-if="isHovered11" class="grey" :src= elements[11].pic fluid></b-img>
                            <b-img v-else :src= elements[11].pic fluid></b-img>
                            <h5 v-if="isHovered11" class="centered">Optimierung</h5>
                        </b-link>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isHovered0: false,
      isHovered1: false,
      isHovered2: false,
      isHovered3: false,
      isHovered4: false,
      isHovered5: false,
      isHovered6: false,
      isHovered7: false,
      isHovered8: false,
      isHovered9: false,
      isHovered10: false,
      isHovered11: false
    }
  },
  methods: {
    handleHover0 (hovered) {
      this.isHovered0 = hovered
    },
    handleHover1 (hovered) {
      this.isHovered1 = hovered
    },
    handleHover2 (hovered) {
      this.isHovered2 = hovered
    },
    handleHover3 (hovered) {
      this.isHovered3 = hovered
    },
    handleHover4 (hovered) {
      this.isHovered4 = hovered
    },
    handleHover5 (hovered) {
      this.isHovered5 = hovered
    },
    handleHover6 (hovered) {
      this.isHovered6 = hovered
    },
    handleHover7 (hovered) {
      this.isHovered7 = hovered
    },
    handleHover8 (hovered) {
      this.isHovered8 = hovered
    },
    handleHover9 (hovered) {
      this.isHovered9 = hovered
    },
    handleHover10 (hovered) {
      this.isHovered10 = hovered
    },
    handleHover11 (hovered) {
      this.isHovered11 = hovered
    }
  },
  created () {
    this.elements = [
      { id: 1, name: 'Kontext der Organisation', pic: require('@/assets/orga.jpeg'), link: '/context' },
      { id: 2, name: 'Führung', pic: require('@/assets/management.jpeg'), link: '/management' },
      { id: 3, name: 'Ressourcen', pic: require('@/assets/resources.jpeg'), link: '/ressources' },
      { id: 4, name: 'Energetische Bewertung', pic: require('@/assets/energy-evaluation.jpeg'), link: '/energetic-evaluation' },
      { id: 5, name: 'Energielesitungskennzahlen', pic: require('@/assets/performance.jpeg'), link: '/energy-performance-indicator' },
      { id: 6, name: 'Ziele', pic: require('@/assets/goals.jpeg'), link: '/energy-goals' },
      { id: 7, name: 'Kompetenz', pic: require('@/assets/awarness.jpeg'), link: '/competence' },
      { id: 8, name: 'Betrieb', pic: require('@/assets/maintenance.jpeg'), link: '/operation' },
      { id: 9, name: 'Beschaffung', pic: require('@/assets/buying.jpeg'), link: '/buying' },
      { id: 10, name: 'Kommunikation', pic: require('@/assets/communication.jpeg'), link: '/communication' },
      { id: 11, name: 'Analyse', pic: require('@/assets/analysis.jpeg'), link: '/analysis' },
      { id: 12, name: 'Optimierung', pic: require('@/assets/optimization.jpeg'), link: '/optimization' }
    ]
    this.points = [
      { id: 1, name: 'Energieverbrauch Gebäude', pic: require('@/assets/building.svg') },
      { id: 2, name: 'Reduzierung Treibhausgase', pic: require('@/assets/co2.svg') },
      { id: 3, name: 'Renovierungsrate in der EU', pic: require('@/assets/rennovation.svg') },
      { id: 4, name: 'Energieeffizienz von Gebäuden', pic: require('@/assets/emission.svg') }
    ]
  }
}
</script>

<style scoped>
#header {
    margin-top: 15px;
    color: #025939;
}
.card {
    margin-inline: 5%;
    margin-bottom: 30px;
    margin-top: 30px;
    max-width: 20%;
}
.card-img-top {
    max-height: 60px;
}
.card-title {
    font-size: 110%;
}
.col-md {
    padding-right: 0px;
    padding-left: 0px;
}
.col {
    padding-right: 0px;
    padding-left: 0px;
}
.grey {
    filter: brightness(50%);
    transition: all 0.5s ease;
}
.container {
  position: relative;
  text-align: center;
  padding-right: 0px;
  padding-left: 0px;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  transition: all 0.5s ease;
}
</style>
