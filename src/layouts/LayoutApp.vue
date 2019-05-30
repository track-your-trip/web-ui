<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawerLeft"
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
    
    <v-navigation-drawer
      v-if="!hideToolbarRight"
      v-model="drawerRight"
      right
      fixed
      clipped
      app
    >
      <slot name="drawerRight" />
    </v-navigation-drawer>

    <v-toolbar color="primary" dark fixed clipped-left clipped-right app>
      <v-toolbar-side-icon @click.stop="drawerLeft = !drawerLeft"></v-toolbar-side-icon>
      <v-toolbar-title>Track Your Trip</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon v-if="!hideToolbarRight" @click.stop="drawerRight = !drawerRight" right></v-toolbar-side-icon>
    </v-toolbar>

    <v-content>
      <slot />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawerLeft: null,
    drawerRight: null,
    mini: false
  }),

  props: {
    source: {
      type: String,
      required: false
    },
    hideToolbarRight: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
