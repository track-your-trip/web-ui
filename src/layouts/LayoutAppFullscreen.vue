<template>
  <layout-app>
    <v-container class="fill-height pa-0" fluid>
      <v-row class="fill-height">
        <v-col cols="12">
          <slot />
        </v-col>
      </v-row>
    </v-container>

    <template v-slot:drawerRight>
      <slot name="drawerRight" />
    </template>
  </layout-app>
</template>
