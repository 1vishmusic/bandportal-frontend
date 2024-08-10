<script setup lang="ts">
import {fetchSessionToken} from "@/auth/AuthManager";

const route = useRoute()
const router = useRouter()

const authCode = route.query?.code;
if(typeof authCode !== 'string') {
  router.push('/')
} else {
  console.log('Auth code from Google: ' + authCode)

  fetchSessionToken(authCode)
    .then(() => {
      router.push('/')
    })
    .catch(console.log)
}
</script>

<template>
  <v-overlay :model-value="true" class="justify-center align-center" :persistent="true">
    <v-progress-circular color="primary" size="42" indeterminate/>
  </v-overlay>
</template>

<style scoped>

</style>
