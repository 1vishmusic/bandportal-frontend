import axios from "axios";
import { SERVER_URL } from "../DataServerConfig";

export interface PlaceRequest {
  placeName: string;
  placeWebsite: string | null;
}

export interface PlaceResponse {
  placeId: number;
  placeName: string;
  placeWebsite: string | null;
}

export const createPlace = (place: PlaceRequest) => new Promise<PlaceResponse>((resolve, reject) =>
  axios.post<PlaceResponse>(SERVER_URL + "place", place)
    .then(r => { resolve(r.data) })
    .catch(reject)
)

export const readAllPlaces = () => new Promise<PlaceResponse[]>((resolve, reject) =>
  axios.get<PlaceResponse[]>(SERVER_URL + "place")
    .then(r => { resolve(r.data) })
    .catch(reject)
)

export const readPlace = (placeId: number) => new Promise<PlaceResponse>((resolve, reject) =>
  axios.get<PlaceResponse>(SERVER_URL + "place/" + placeId)
    .then(r => { resolve(r.data) })
    .catch(reject)
)

export const updatePlace = (placeId: number, place: PlaceRequest) => new Promise<PlaceResponse>((resolve, reject) =>
  axios.put(SERVER_URL + "place/" + placeId, place)
    .then(r => { resolve(r.data) })
    .catch(reject)
)

export const deletePlace = (placeId: number) => new Promise<void>((resolve, reject) =>
  axios.delete(SERVER_URL + "place/" + placeId)
    .then(r => { resolve() })
    .catch(reject)
)
