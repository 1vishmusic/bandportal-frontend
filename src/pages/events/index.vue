<script setup lang="ts">
import { onMounted, ref } from "vue";
import { BandResponse, readAllBands } from "@/api/service/BandService";
import { PlaceResponse, readAllPlaces } from "@/api/service/PlaceService";
import {storeToRefs} from "pinia";
import {useEventStore} from "@/stores/app";

const eventStore = useEventStore()
const { events, upcomingEvents, eventsLoaded, upcomingEventsLoaded } = storeToRefs(eventStore)

const bands = ref<BandResponse[]>([]);
const places = ref<PlaceResponse[]>([]);

onMounted(() => {
  readAllBands()
    .then(b => {bands.value = b})
  readAllPlaces()
    .then(p => {places.value = p})

  eventStore.loadEvents();
});
</script>

<template>
  <div class="mb-6">
    <h2 class="mb-2 text-h4 text-sm-h4">Nadcházející události</h2>

    <v-card class="mb-2">
      <div class="pa-4 d-flex justify-end">
        <AddEvent
          :bands="bands"
          :places="places"
          @on-event-modify="eventStore.loadEvents"
        />
      </div>
      <v-divider />
      <EventList
        :events="upcomingEvents"
        :loaded="upcomingEventsLoaded"
        :bands="bands"
        :places="places"
        sort-order="asc"
        @on-update="eventStore.loadEvents"
      />
    </v-card>
  </div>
  <div class="mb-4">
    <h2 class="mb-2 text-h4 text-sm-h4">Všechny události</h2>

    <v-card class="mb-2">
      <div class="pa-4 d-flex justify-end">
        <AddEvent
          :bands="bands"
          :places="places"
          @on-event-modify="eventStore.loadEvents"
        />
      </div>
      <v-divider />
      <EventList
        :events="events"
        :loaded="eventsLoaded"
        :bands="bands"
        :places="places"
        sort-order="desc"
        @on-update="eventStore.loadEvents"
      />
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
