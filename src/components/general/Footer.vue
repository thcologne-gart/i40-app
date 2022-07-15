<template>
  <v-footer
    id="footer"
    paddless
    color="grey lighten-1">
    >
    <v-row justify="center" no-gutters>
      <v-container>
        <v-btn v-for="link in links" :key="link" color="white" text class="my-2" rounded id="footer-button">
          {{ link }}
        </v-btn>
      </v-container>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      'Home',
      'About Us',
      'Services',
      'Blog',
      'Contact Us'
    ],
    padless: false
  }),
  computed: {
    localAttrs () {
      const attrs = {}

      if (this.variant === 'default') {
        attrs.absolute = false
        attrs.fixed = false
      } else {
        attrs[this.variant] = true
      }
      return attrs
    }
  }
}
</script>

<style scoped>
#footer {
  padding-top: 0;
  padding-bottom: 0;
}
#footer-button {
  width: 10%;
}

.container {
  padding: 0;
}
</style>
