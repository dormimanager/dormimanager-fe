<template>
  <h1>하이하이</h1>
</template>
<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const token = authStore.token
const test = authStore.username
console.log(token)
console.log(test)
</script>