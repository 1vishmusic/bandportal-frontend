<script setup lang="ts">
import {
  EventResponse,
  readAllEvents,
  readUpcomingEvents,
} from "@/api/service/EventService";
import { onMounted, Ref, ref } from "vue";
import { BandResponse, readAllBands } from "@/api/service/BandService";
import { PlaceResponse, readAllPlaces } from "@/api/service/PlaceService";

const events: Ref<EventResponse[]> = ref([]);
const upcomingEvents: Ref<EventResponse[]> = ref([]);
const eventsLoaded = ref(false)
const upcomingEventsLoaded = ref(false)

const bands = ref<BandResponse[]>([]);
const places = ref<PlaceResponse[]>([]);

const fetchAllEvents = () => {
  readAllEvents()
    .then(e => {events.value = e; eventsLoaded.value = true})
  readUpcomingEvents()
    .then(e => {upcomingEvents.value = e; upcomingEventsLoaded.value = true})
};

onMounted(() => {
  readAllBands()
    .then(b => {bands.value = b})
  readAllPlaces()
    .then(p => {places.value = p})

  fetchAllEvents();
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
          @on-event-modify="fetchAllEvents"
        />
      </div>
      <v-divider />
      <EventList
        :events="upcomingEvents"
        :loaded="upcomingEventsLoaded"
        :bands="bands"
        :places="places"
        sort-order="asc"
        @on-update="fetchAllEvents"
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
          @on-event-modify="fetchAllEvents"
        />
      </div>
      <v-divider />
      <EventList
        :events="events"
        :loaded="eventsLoaded"
        :bands="bands"
        :places="places"
        sort-order="desc"
        @on-update="fetchAllEvents"
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
