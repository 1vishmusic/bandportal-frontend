<script setup lang="ts">
import {getOAuthEndpoint} from "../auth/AuthManager";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/app";

const router = useRouter()
const { user } = storeToRefs(useUserStore())
</script>

<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title @click="router.push('/')" style="cursor: pointer">bandportal</v-app-bar-title>

    <div v-if="user !== null">
      <v-btn to="/events">Události</v-btn>
      <v-btn to="/places">Místa</v-btn>
      <v-btn to="/bands">Interpreti</v-btn>
    </div>

    <v-spacer></v-spacer>

    <v-btn v-if="user !== null">{{ user?.username }}</v-btn>
    <v-btn v-else :href="getOAuthEndpoint()">Přihlásit se</v-btn>
  </v-app-bar>
</template>

<style scoped></style>
