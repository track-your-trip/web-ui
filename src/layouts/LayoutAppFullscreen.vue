<template>
  <layout-app>
    <v-container fluid fill-height pa-0>
      <v-layout row fill-height>
        <v-flex xs12>
          <slot />
        </v-flex>
      </v-layout>
    </v-container>

    <template v-slot:drawerRight>
      <slot name="drawerRight" />
    </template>
  </layout-app>
</template>
