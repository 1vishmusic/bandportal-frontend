import axios from "axios";
import {SERVER_URL} from "@/api/DataServerConfig";

export interface UserResponse {
  username: string,
  email: string
}

export const readUser = () => new Promise<UserResponse>((resolve, reject) =>
  axios.get<UserResponse>(SERVER_URL + "user")
    .then(r => { resolve(r.data) })
    .catch(reject)
)
