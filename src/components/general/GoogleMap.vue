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
        :zoom='12'
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
    site: Array,
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
      // center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      /*
      markers: [
        { position: { lat: 45.508, lng: -73.587 } },
        { position: { lat: 44.508, lng: 11.587 } }
      ],
      */
      markers: [],
      places: [
        { position: { lat: 45.508, lng: -73.587 } },
        { position: { lat: 44.508, lng: 11.587 } }
      ]
    }
  },
  mounted () {
    console.log(this.site)
    this.center = ({
      lat: this.site[4].value,
      lng: this.site[5].value
    })
    const markers = []
    for (const element in this.buildings) {
      const content =
      '<v-card class ="mx-auto my-8" max-width="90%" elevation="2">' +
      '<v-card-title id="card-title">' + this.buildings[element].buildingDesignation + '</v-card-title>' +
      '</v-card>'
      markers.push({
        position: {
          lat: this.buildings[element].lat,
          lng: this.buildings[element].lng
        },
        infoText: content
      })
    }
    this.markers = markers
    console.log(this.buildings)
    // this.geolocate()
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
    setPlace (place) {
      console.log(place)
      this.currentPlace = place
    },
    addMarker () {
      if (this.currentPlace) {
        console.log(this.currentPlace.geometry.location.lat())
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
        console.log(marker)
        console.log(this.markers[0])
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
