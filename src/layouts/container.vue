<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container class="pa-4 pa-sm-6 pa-md-8" style="max-width: 1400px">
        <div v-if="user !== null">
          <router-view />
        </div>
        <div v-else class="d-flex justify-center align-center">
          <LoginForm />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/app";

const { user } = storeToRefs(useUserStore())
</script>
