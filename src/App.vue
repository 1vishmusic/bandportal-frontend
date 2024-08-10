<script lang="ts" setup>
import {lazyLoadSession} from "@/auth/AuthManager";

lazyLoadSession()
</script>

<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
