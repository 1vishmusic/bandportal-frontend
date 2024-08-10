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

const bands = ref<BandResponse[]>([]);
const places = ref<PlaceResponse[]>([]);

const fetchAllEvents = () => {
  readAllEvents()
    .then(e => {events.value = e})
  readUpcomingEvents()
    .then(e => {events.value = e})
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
  <v-container>
    <div class="mb-4">
      <div class="d-flex justify-space-between mb-2">
        <div class="text-h4">Nadcházející události</div>
        <AddEvent
          :bands="bands"
          :places="places"
          @on-event-modify="fetchAllEvents"
        />
      </div>
      <EventList
        :events="upcomingEvents"
        :bands="bands"
        :places="places"
        sort-order="asc"
        @on-update="fetchAllEvents"
      />
    </div>

    <div>
      <div class="text-h4 mb-2">Všechny události</div>
      <EventList
        :events="events"
        :bands="bands"
        :places="places"
        sort-order="desc"
        @on-update="fetchAllEvents"
      ></EventList>
    </div>
  </v-container>
</template>

<style scoped></style>
