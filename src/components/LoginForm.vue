<script setup lang="ts">

import {getOAuthEndpoint} from "@/auth/AuthManager";
</script>

<template>
  <v-overlay :model-value="true" class="align-center justify-center" :persistent="true">
    <v-card max-width="400" class="pa-2">
      <v-card-title>Přihlásit se</v-card-title>
      <v-card-text>Pro využití kapelního portálu se musíte přihlásit.</v-card-text>
      <v-card-actions>
        <v-btn :href="getOAuthEndpoint()" variant="tonal">Přihlásit se</v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<style scoped>

</style>
