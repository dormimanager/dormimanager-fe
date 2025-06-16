<template>
  <h1>하이하이</h1>
  <button @click="laundry">세탁</button>
</template>

<script setup>

import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const token = authStore.token
const username = authStore.username
console.log(token)
console.log(username)

function laundry() {
  router.push('/member/laundry')
}
</script>

<style>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
