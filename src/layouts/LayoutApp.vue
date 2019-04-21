<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      fixed
      clipped
      app
    >
      <v-list>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/trips">
          <v-list-tile-action>
            <v-icon>fas fa-map</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Trips</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="primary" dark fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Track Your Trip</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <slot />
      <global-snackbar />
    </v-content>
  </v-app>
</template>

<script>
import GlobalSnackbar from '../components/GlobalSnackbar.vue'

export default {

  components: {
    GlobalSnackbar
  },

  data: () => ({
    drawer: true,
    mini: true
  }),

  props: {
    source: String
  }
}
</script>
