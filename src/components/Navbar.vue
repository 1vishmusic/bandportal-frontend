<script setup lang="ts">
import {getOAuthEndpoint} from "@/auth/AuthManager";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/app";

const router = useRouter()
const { user } = storeToRefs(useUserStore())

const drawer = ref(false)
</script>

<template>
  <v-app-bar :elevation="2">
    <template #prepend >
      <v-app-bar-nav-icon class="hidden-sm-and-up" @click="drawer = !drawer" />
    </template>
    <v-app-bar-title @click="router.push('/')" style="cursor: pointer">bandportal</v-app-bar-title>

    <div v-if="user !== null" class="hidden-xs">
      <v-btn to="/events">Události</v-btn>
      <v-btn to="/places">Místa</v-btn>
      <v-btn to="/bands">Interpreti</v-btn>
    </div>

    <v-spacer></v-spacer>

    <v-btn v-if="user !== null">{{ user?.username }}</v-btn>
    <v-btn v-else :href="getOAuthEndpoint()">Přihlásit se</v-btn>
  </v-app-bar>
  <v-navigation-drawer class="hidden-sm-and-up" v-model="drawer">
    <v-list>
      <v-list-item to="/events" @click="drawer = false">Události</v-list-item>
      <v-list-item to="/places" @click="drawer = false">Místa a Podniky</v-list-item>
      <v-list-item to="/bands" @click="drawer = false">Interpreti</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped></style>
