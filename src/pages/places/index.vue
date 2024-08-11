<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { PlaceResponse, readAllPlaces } from "@/api/service/PlaceService";
import {storeToRefs} from "pinia";
import {usePlaceStore} from "@/stores/app";

const placeStore = usePlaceStore()
const { places, placesLoaded } = storeToRefs(placeStore)
</script>

<template>
  <div class="mb-6">
    <h2 class="mb-2 text-h4 text-sm-h4">Místa a podniky</h2>

    <v-card class="mb-2">
      <div class="pa-4 d-flex justify-end">
        <AddPlace @on-place-modify="placeStore.loadPlaces" />
      </div>
      <v-divider />
      <PlaceList :places="places" :loaded="placesLoaded" @on-update="placeStore.loadPlaces" />

    </v-card>
  </div>
</template>

<route>
{
  meta: {
    layout: "container"
  }
}
</route>


<style scoped></style>
