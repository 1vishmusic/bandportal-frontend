<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { BandResponse, readAllBands } from "@/api/service/BandService";

const bands: Ref<BandResponse[]> = ref([]);
const bandsLoaded = ref(false)

const fetchAllBands = () => {
  readAllBands()
    .then(b => { bands.value = b; bandsLoaded.value = true })
};

onMounted(fetchAllBands);
</script>

<template>
  <div class="mb-6">
    <h2 class="mb-2 text-h4 text-sm-h4">Interpreti a kapely</h2>

    <v-card class="mb-2">
      <div class="pa-4 d-flex justify-end">
        <AddBand @on-band-modify="fetchAllBands" />
      </div>
      <v-divider />
      <BandList :bands="bands" :loaded="bandsLoaded" @on-update="fetchAllBands" />
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
