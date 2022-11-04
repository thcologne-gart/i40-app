<template>
  <div>
    <v-card class ="mx-auto my-8" max-width="90%" elevation="2">
        <!--
      <div>
        <GmapAutocomplete
            @place_changed='setPlace'
        />
        <button
            @click='addMarker'
        >
            Add
        </button>
        </div>
        <br>
      -->
        <GmapMap
        :center='center'
        :zoom='6'
        style='width:100%;  height: 400px;'
        >
        <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
        />
        <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="toggleInfoWindow(m, index)"
            :clickable="true"
        />
        </GmapMap>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  props: {
    sites: Array,
    buildings: Array
  },
  data () {
    return {
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        content: '',
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      center: {},
      currentPlace: null,
      markers: []
    }
  },
  mounted () {
    /*
    console.log(this.site)
    this.center = ({
      lat: this.site[4].value,
      lng: this.site[5].value
    })
    */
    const markers = []
    for (const element in this.sites) {
      const content =
      '<v-card class ="mx-auto my-8" max-width="90%" elevation="2">' +
      '<v-card-title id="card-title">' + this.sites[element][1].value + '</v-card-title>' +
      '</v-card>'
      markers.push({
        position: {
          lat: this.sites[element][4].value,
          lng: this.sites[element][5].value
        },
        infoText: content
      })
    }
    this.markers = markers
    console.log(this.sites)
    console.log(this.markers)
    this.geolocate()
  },
  methods: {
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.position
      this.infoOptions.content = marker.infoText
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
</script>
