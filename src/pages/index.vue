<script setup lang="ts">
import { onMounted, ref } from "vue";
import {BandResponse, readAllBands} from "@/api/service/BandService";
import {PlaceResponse, readAllPlaces} from "@/api/service/PlaceService";
import {EventResponse, readAllEvents, readUpcomingEvents} from "@/api/service/EventService";
import {useUserStore} from "@/stores/app";
import {storeToRefs} from "pinia";

const { user } = storeToRefs(useUserStore())

const bands = ref<BandResponse[]>([]);
const places = ref<PlaceResponse[]>([]);
const events = ref<EventResponse[]>([]);
const upcomingEvents = ref<EventResponse[]>([]);

onMounted(() => {
  readAllBands()
    .then(b => { bands.value = b })
  readAllPlaces()
    .then(p => { places.value = p })
  readAllEvents()
    .then(e => { events.value = e })
  readUpcomingEvents()
    .then(e => { upcomingEvents.value = e })
});
</script>

<template>
  <div v-if="user !== null">
    <div class="text-h4 mb-3">Přehled portálu</div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Události</v-card-title>
          <v-card-text
          >Počet proběhlých událostí: {{ events.length }}</v-card-text
          >
          <v-card-actions>
            <v-btn to="events">Správa událostí</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Nadcházející události</v-card-title>
          <v-card-text
          >Počet naplánovaných událostí:
            {{ upcomingEvents.length }}</v-card-text
          >
          <v-card-actions>
            <v-btn to="events">Správa událostí</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Místa, podniky</v-card-title>
          <v-card-text
          >Počet registrovaných míst: {{ places.length }}</v-card-text
          >
          <v-card-actions>
            <v-btn to="places">Správa míst a podniků</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Interpreti</v-card-title>
          <v-card-text
          >Počet registrovaných interpretů: {{ bands.length }}</v-card-text
          >
          <v-card-actions>
            <v-btn to="bands">Správa interpretů</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div v-else class="d-flex justify-center align-center">
    <LoginForm />
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
