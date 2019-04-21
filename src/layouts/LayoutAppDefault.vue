<template>
  <layout-app>
    <v-container fluid fill-height>
      <v-layout row fill-height>
        <v-flex text-xs-center>
          <slot />
        </v-flex>
      </v-layout>
    </v-container>
  </layout-app>
</template>