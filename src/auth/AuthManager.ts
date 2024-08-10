import axios from "axios";
import {readUser} from "@/api/service/UserService";
import {useUserStore} from "@/stores/app";
import {storeToRefs} from "pinia";

const REDIRECT_URI = import.meta.env.VITE_OAUTH_REDIRECT_URI
const AUTH_CODE_EXCHANGE_ENDPOINT = import.meta.env.VITE_OAUTH_CODE_EXCHANGE_ENDPOINT

const SESSION_TOKEN_INDEX = "session_token"

interface LoginRequest extends Record<string, string>{
  client_id: string,
  redirect_uri: string,
  scope: string,
  response_type: 'code'
}

interface OAuthCodeExchangeRequest {
  code: string,
}

interface OAuthCodeExchangeResponse {
  session_token: string
}

export function getOAuthEndpoint(): string {
  const loginRequest: LoginRequest = {
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    response_type: 'code'
  }
  const params = new URLSearchParams(loginRequest)

  return import.meta.env.VITE_OAUTH_ENDPOINT + '?' + params.toString();
}

export function fetchSessionToken(authCode: string) {
  return new Promise<void>((resolve, reject) => {
    const request: OAuthCodeExchangeRequest = {
      code: authCode
    }

    axios.post<OAuthCodeExchangeResponse>(AUTH_CODE_EXCHANGE_ENDPOINT, request)
      .then(r => {
        saveSessionToken(r.data.session_token)
        loadAxios()

        const { user } = storeToRefs(useUserStore())
        readUser()
          .then(userResponse => {
            user.value = userResponse
            resolve()
          })
          .catch(reject)
      })
      .catch(reject)
  })
}

const saveSessionToken = (token: string) => {
  localStorage.setItem(SESSION_TOKEN_INDEX, token)
}

export const isAuthenticated = computed(() => useUserStore().user !== null)

const getAuthHeader = () => {
  return "Bearer " + localStorage.getItem(SESSION_TOKEN_INDEX)
}

function loadAxios() {
  axios.defaults.headers.common['Authorization'] = getAuthHeader()
  axios.interceptors.response.use(response => {
    return response
  }, error => {
    if(error.response.status === 401) {
      localStorage.removeItem(SESSION_TOKEN_INDEX)
      useUserStore().$reset()
    }
    return error
  })
}

export function lazyLoadSession() {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  if(user.value !== null) {
    if(localStorage.getItem(SESSION_TOKEN_INDEX) !== null) { // Token=set;Data=set
      loadAxios()
      return;
    }

    // Token=null;Data=set
    user.value = null
    return
  }

  if(localStorage.getItem(SESSION_TOKEN_INDEX) === null) { // Token=null;Data=null
    return;
  }

  // Token=set;Data=null
  loadAxios()
  readUser()
    .then(userResponse => {
      user.value = userResponse
    })
    .catch(err => {
      user.value = null
      localStorage.removeItem(SESSION_TOKEN_INDEX)

      console.log(err)
    })
}
