<template>
  <div>
    <v-card class ="mx-auto my-8" max-width="90%" elevation="2">
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
        <GmapMap
        :center='center'
        :zoom='12'
        style='width:100%;  height: 400px;'
        >
        <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="center=m.position"
        />
        </GmapMap>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  data () {
    return {
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: [
        { position: { lat: 45.508, lng: -73.587 } },
        { position: { lat: 44.508, lng: 11.587 } }
      ],
      places: [
        { position: { lat: 45.508, lng: -73.587 } },
        { position: { lat: 44.508, lng: 11.587 } }
      ]
    }
  },
  mounted () {
    this.geolocate()
  },
  methods: {
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
