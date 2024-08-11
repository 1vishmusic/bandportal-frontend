<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useBandStore, useEventStore, usePlaceStore} from "@/stores/app";

const { bands } = storeToRefs(useBandStore())
const { places } = storeToRefs(usePlaceStore())
const { events, upcomingEvents } = storeToRefs(useEventStore())
</script>

<template>
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
</template>

<route>
{
  meta: {
    layout: "container"
  }
}
</route>

<style scoped></style>
