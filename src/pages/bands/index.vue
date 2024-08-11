<script setup lang="ts">
import {useBandStore} from "@/stores/app";
import {storeToRefs} from "pinia";

const bandStore = useBandStore()
const { bands, bandsLoaded } = storeToRefs(bandStore)
</script>

<template>
  <div class="mb-6">
    <h2 class="mb-2 text-h4 text-sm-h4">Interpreti a kapely</h2>

    <v-card class="mb-2">
      <div class="pa-4 d-flex justify-end">
        <AddBand @on-band-modify="bandStore.loadBands" />
      </div>
      <v-divider />
      <BandList :bands="bands" :loaded="bandsLoaded" @on-update="bandStore.loadBands" />
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
