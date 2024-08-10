import axios from "axios";
import { SERVER_URL } from "../DataServerConfig";
import { BandResponse } from "./BandService";
import {PlaceResponse} from "@/api/service/PlaceService";

export interface EventRequest {
  eventName: string;
  eventStart: string;
  eventEnd: string | null;
  eventWebsite: string | null;

  placeId: number;
  bands: number[];
}

export interface EventResponse {
  eventId: number;
  eventName: string;
  eventStart: string;
  eventEnd: string | null;
  eventWebsite: string | null;

  place: PlaceResponse;
  ticketId: null; // TODO - Ticket Response
  bands: BandResponse[];
}

export const createEvent = (event: EventRequest) => new Promise<EventResponse>((resolve, reject) =>
  axios.post<EventResponse>(SERVER_URL + "event", event)
    .then(r => { resolve(r.data) })
    .catch(reject)
)

export const readAllEvents = () => new Promise<EventResponse[]>((resolve, reject) =>
  axios.get<EventResponse[]>(SERVER_URL + "event")
    .then(r => { resolve(r.data) })
    .catch(reject)
)

export const readUpcomingEvents = () => new Promise<EventResponse[]>((resolve, reject) =>
  axios.get<EventResponse[]>(SERVER_URL + "event/upcoming")
    .then(r => { resolve(r.data) })
    .catch(reject)
)

export const readEvent = (eventId: number) => new Promise<EventResponse>((resolve, reject) =>
  axios.get<EventResponse>(SERVER_URL + "event/" + eventId)
    .then(r => { resolve(r.data) })
    .catch(reject)
)

export const updateEvent = (eventId: number, event: EventRequest) => new Promise<EventResponse>((resolve, reject) =>
  axios.put(SERVER_URL + "event/" + eventId, event)
    .then(r => { resolve(r.data) })
    .catch(reject)
)

export const deleteEvent = (eventId: number) => new Promise<void>((resolve, reject) =>
  axios.delete(SERVER_URL + "event/" + eventId)
    .then(r => { resolve() })
    .catch(reject)
)
