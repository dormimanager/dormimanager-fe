<template>
  <h1>하이하이</h1>
  <button @click="laundry">세탁</button>
</template>

<script>
export default {
  name : 'MainPage',
  methods: {
    laundry() {
      this.$router.push('/laundry')
    }
  }
}
</script>

<style>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>