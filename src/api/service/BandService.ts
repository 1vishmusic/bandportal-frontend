import axios from "axios";
import { SERVER_URL } from "../DataServerConfig";

export interface BandRequest {
  bandName: string;
  bandWebsite: string | null;
}

export interface BandResponse {
  bandId: number;
  bandName: string;
  bandWebsite: string | null;
}

export const createBand = (band: BandRequest) => new Promise<BandResponse>((resolve, reject) =>
  axios.post<BandResponse>(SERVER_URL + "band", band)
    .then(r => { resolve(r.data) })
    .catch(reject)
)

export const readAllBands = () => new Promise<BandResponse[]>((resolve, reject) =>
  axios.get<BandResponse[]>(SERVER_URL + "band")
    .then(r => { resolve(r.data) })
    .catch(reject)
)

export const readBand = (bandId: number) => new Promise<BandResponse>((resolve, reject) =>
  axios.get<BandResponse>(SERVER_URL + "band/" + bandId)
    .then(r => { resolve(r.data) })
    .catch(reject)
)

export const updateBand = (bandId: number, band: BandRequest) => new Promise<BandResponse>((resolve, reject) =>
  axios.put(SERVER_URL + "band/" + bandId, band)
    .then(r => { resolve(r.data) })
    .catch(reject)
)

export const deleteBand = (bandId: number) => new Promise<void>((resolve, reject) =>
  axios.delete(SERVER_URL + "band/" + bandId)
    .then(r => { resolve() })
    .catch(reject)
)
