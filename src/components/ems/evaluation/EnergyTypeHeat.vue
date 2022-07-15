<template>
    <div>
        <v-card v-show="expandH" id="energyUseGroup"
                        class ="mx-auto my-4 p
                        -4" min-height="75px" elevation="2"
                    >
            <p>Platzhalter Wärme</p>
        </v-card>
    </div>
</template>

<script>
export default {
  props: {
    energyType: Array,
    enpis: Array,
    building: Number,
    site: Number,
    expandH: Boolean
  }
}
</script>
