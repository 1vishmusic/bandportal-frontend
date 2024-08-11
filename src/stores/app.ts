// Utilities
import { defineStore } from 'pinia'
import {UserResponse} from "@/api/service/UserService";
import {EventResponse, readAllEvents, readUpcomingEvents} from "@/api/service/EventService";
import {PlaceResponse, readAllPlaces} from "@/api/service/PlaceService";
import {BandResponse, readAllBands} from "@/api/service/BandService";

export const useUserStore = defineStore('user', () => {
  const user = ref<UserResponse|null>(null)

  function $reset() {
    user.value = null
  }

  return { user, $reset }
})

export const useEventStore = defineStore('event', () => {
  const events = ref<EventResponse[]>([])
  const upcomingEvents = ref<EventResponse[]>([])

  const eventsLoaded = ref(false)
  const upcomingEventsLoaded = ref(false)

  const loadEvents = () => {
    readUpcomingEvents()
      .then(e => {
        upcomingEvents.value = e
        upcomingEventsLoaded.value = true
      })
    readAllEvents()
      .then(e => {
        events.value = e
        eventsLoaded.value = true
      })
  }

  loadEvents()

  return { events, upcomingEvents, eventsLoaded, upcomingEventsLoaded, loadEvents }
})

export const usePlaceStore = defineStore('place', () => {
  const places = ref<PlaceResponse[]>([])
  const placesLoaded = ref(false)

  const loadPlaces = () => {
    readAllPlaces()
      .then(p => {
        places.value = p
        placesLoaded.value = true
      })
  }

  loadPlaces()

  return { places, placesLoaded, loadPlaces }
})

export const useBandStore = defineStore('band', () => {
  const bands = ref<BandResponse[]>([])
  const bandsLoaded = ref(false)

  const loadBands = () => {
    readAllBands()
      .then(b => {
        bands.value = b
        bandsLoaded.value = true
      })
  }

  loadBands()

  return { bands, bandsLoaded, loadBands }
})

export const useAppStore = defineStore('app', {
  state: () => ({
    //
  }),
})
