<template>
  <v-app>
    <!-- Navigation -->
    <v-navigation-drawer v-if="authorized" v-model="drawer" app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar v-if="authorized" flat app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <!-- Content -->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <!-- Footer -->
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} - SchWEBSoft</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-map',
          title: 'Map',
          to: '/map'
        }
      ],
      title: 'Track-Your-Trip'
    }
  },

  computed: {
    authorized() {
      return !!this.$apolloHelpers.getToken()
    }
  }
}
</script>
