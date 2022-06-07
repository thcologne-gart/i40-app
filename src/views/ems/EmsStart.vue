<template>
  <div>
    <b-container id ="picture-text">
        <b-card-group>
            <b-card
            overlay
            title='Energiemanagementsystem nach DIN EN ISO 50001'
            text-variant="white"
            style="width: 100%;"
            :img-src="require('@/assets/ems-start.jpeg')">
            </b-card>
            <b-card
            class="card mb-4 border-0">
              <b-card-text>Test
              </b-card-text>
            </b-card>
        </b-card-group>
    </b-container>
    <b-container id="points">
        <b-card-group>
                <InfoPoint :point="points[0].name" :image="points[0].pic" :text="points[0].text">
                </InfoPoint>
                <InfoPoint :point="points[1].name" :image="points[1].pic" :text="points[1].text">
                </InfoPoint>
                <InfoPoint :point="points[2].name" :image="points[2].pic" :text="points[2].text">
                </InfoPoint>
                <InfoPoint :point="points[3].name" :image="points[3].pic" :text="points[3].text">
                </InfoPoint>
        </b-card-group>
    </b-container>
    <div>
      <b-card
        id="ems-start"
        title="Energiemanagementsystem"
        tag="article"
        style="max-width: 40rem;"
        class="shadow p-3 mb-5 bg-white rounded mx-auto"
      >
        <b-card-img :src="require('@/assets/ems-start.jpeg')"></b-card-img>
        <b-card-text>
          Starten Sie mit der Konfiguration Ihres Energiemanagentsystems
        </b-card-text>
        <b-button to="/emsstart" variant="outline-secondary">Start</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import InfoPoint from '@/components/InfoPoint.vue'

export default {
  components: { InfoPoint },
  created () {
    this.points = [
      { id: 1, name: 'Energieverbrauch Gebäude', pic: require('@/assets/building.svg'), text: 'Gebäude sind für 40 % des gesamten Energieverbrauchs und 36 % aller Treibhausgasemissionen verantwortlich.' },
      { id: 2, name: 'Reduzierung Treibhausgase', pic: require('@/assets/co2.svg'), text: 'Nach dem Green Deal der EU sollen die Treibhausgase bis 2030 gegenüber 1990 um 55 % reduziert werden.' },
      { id: 3, name: 'Renovierungsrate in der EU', pic: require('@/assets/rennovation.svg'), text: 'Die Renovierungsrate von Gebäuden innerhalb der EU liegt momentan bei rund 1 %.' },
      { id: 4, name: 'Energieeffizienz von Gebäuden', pic: require('@/assets/emission.svg'), text: 'Durch die Einführung eines Energiemanagement Systems kann im Durchschnitt 30 % der Energie eingespart werden.' }
    ]
  }
}
</script>

<style scoped>
#ems-start {
  margin-top: 20px;
  margin-bottom: 20px;
}
#header {
    margin-top: 15px;
    color: #025939;
}
.card {
    width: 100%;
}
.card-img {
    border-radius: 0;
}
.card-title {
    font-size: 110%;
}
.container {
  position: relative;
  text-align: center;
  padding-right: 0px;
  padding-left: 0px;
}
#picture-text {
  margin-left: 0px;
  margin-right: 0px;
  max-width: 4000px;
  border-style: 0;
  font-size: 200%;
}
</style>
