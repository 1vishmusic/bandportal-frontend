// Utilities
import { defineStore } from 'pinia'
import {UserResponse} from "@/api/service/UserService";

export const useUserStore = defineStore('user', () => {
  const user = ref<UserResponse|null>(null)

  function $reset() {
    user.value = null
  }

  return { user, $reset }
})

export const useAppStore = defineStore('app', {
  state: () => ({
    //
  }),
})
