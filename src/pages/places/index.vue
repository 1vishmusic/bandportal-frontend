<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { PlaceResponse, readAllPlaces } from "@/api/service/PlaceService";

const places: Ref<PlaceResponse[]> = ref([]);
const placesLoaded = ref(false)

const fetchAllPlaces = () => {
  readAllPlaces()
    .then(p => { places.value = p; placesLoaded.value = true })
};

onMounted(fetchAllPlaces);
</script>

<template>
  <div class="mb-6">
    <h2 class="mb-2 text-h4 text-sm-h4">Místa a podniky</h2>

    <v-card class="mb-2">
      <div class="pa-4 d-flex justify-end">
        <AddPlace @on-place-modify="fetchAllPlaces" />
      </div>
      <v-divider />
      <PlaceList :places="places" :loaded="placesLoaded" @on-update="fetchAllPlaces" />

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
