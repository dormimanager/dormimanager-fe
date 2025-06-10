<template>
  <div>
    <button @click="fetchTests">테이블 조회</button>
    <button @click="fetchTests">내거</button>
    <ul>
      <li v-for="item in testList" :key="item.id">
        {{ item.id }} - {{ item.name }}
      </li>
    </ul>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'


const testList = ref([])

const fetchTests = async () => {
  try {
    const response = await axios.get('/api/test')
    testList.value = response.data
  } catch (e) {
    alert('조회 실패')
  }
}
</script>
