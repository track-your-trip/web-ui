<template>
  <layout-app hide-toolbar-right>
    <v-container fluid fill-height>
      <v-layout row fill-height>
        <v-flex xs12>
          <slot />
        </v-flex>
      </v-layout>
    </v-container>
  </layout-app>
</template>
