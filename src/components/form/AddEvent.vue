<script setup lang="ts">
import {createEvent, EventRequest} from "@/api/service/EventService";
import { PlaceResponse } from "@/api/service/PlaceService";
import { BandResponse } from "@/api/service/BandService";
import { ref } from "vue";
import {now} from "@/utils/DateFormat";

const props = defineProps<{
  places: PlaceResponse[];
  bands: BandResponse[];
}>();

const emit = defineEmits({
  onEventModify() {},
  onError(message: string): void {},
});

const name = ref<string>("");
const website = ref<string>("");
const start = ref<string>(now());
const end = ref<string|null>(null);

const place = ref<PlaceResponse|null>(null);
const bands = ref<BandResponse[]>([]);

const create = () => {
  if(place.value === null) {
    return
  }

  const eventRequest: EventRequest = {
    eventName: name.value,
    eventWebsite: website.value === "" ? null : website.value,
    eventStart: start.value,
    eventEnd: end.value,
    placeId: place.value.placeId,
    bands: bands.value.map((b) => b.bandId),
  }

  createEvent(eventRequest)
    .then(() => {
      name.value = website.value = "";
      start.value = now()
      end.value = place.value = null;
      bands.value = [];
      emit("onEventModify");
    })
    .catch((e) => emit('onError', e.message))
};
</script>

<template>
  <v-btn prepend-icon="$plus" variant="tonal">
    Nová událost
    <v-dialog activator="parent" max-width="550">
      <template v-slot:default="{ isActive }">
        <v-card title="Nová událost">
          <v-card-text>
            <v-text-field v-model="name" label="Název události"></v-text-field>
            <v-text-field
              v-model="website"
              label="Webové stránky události"
            ></v-text-field>
            <div class="d-flex">
              <v-text-field
                v-model="start"
                label="Začátek události"
                type="datetime-local"
              ></v-text-field>
              <v-text-field
                v-model="end"
                label="Konec události"
                type="datetime-local"
              ></v-text-field>
            </div>
            <v-select
              v-model="place"
              :item-props="
                (p: PlaceResponse) => {
                  return { title: p.placeName };
                }
              "
              :items="
                props.places.sort((a: PlaceResponse, b: PlaceResponse) =>
                  a.placeName.localeCompare(b.placeName),
                )
              "
              label="Místo konání"
            ></v-select>
            <v-select
              v-model="bands"
              :item-props="
                (b: BandResponse) => {
                  return { title: b.bandName };
                }
              "
              :items="
                props.bands.sort((a: BandResponse, b: BandResponse) => a.bandName.localeCompare(b.bandName))
              "
              label="Kapely"
              multiple
            >
            </v-select>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn @click="isActive.value = false">Zrušit</v-btn>
            <v-btn
              color="primary"
              @click="
                () => {
                  isActive.value = false;
                  create();
                }
              "
              >Uložit</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-btn>
</template>

<style scoped></style>
