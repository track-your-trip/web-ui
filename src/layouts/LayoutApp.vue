<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      fixed
      clipped
      app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img
                :src="
                  'https://randomuser.me/api/portraits/men/' +
                    Math.floor(Math.random() * 100 + 1) +
                    '.jpg'
                "
              />
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>User</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list>
        <v-list-tile :to="{ name: 'dashboard' }">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{ name: 'trips' }">
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
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    mini: false
  }),

  props: {
    source: String
  }
}
</script>
