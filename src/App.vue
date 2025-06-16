<template>
  <div id="app">
    <div class="top-area" v-if="!hideHeader">
      <HeaderPage></HeaderPage>
    </div>
    <div class="center-area">
      <router-view></router-view>
    </div>
    <div class="bottom-area" v-if="!hideHeader">
      <FooterPage></FooterPage>
    </div>
  </div>
</template>

<script>
import HeaderPage from './components/headerPage.vue';
import FooterPage from './components/footerPage.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
export default {
  components: { HeaderPage, FooterPage },
  name: 'App',
  setup() {
    const route = useRoute();
    const hideHeader = computed(() => !!route.meta.hideHeader);
    const hideFooter = computed(() => !!route.meta.hideFooter);
    return { hideHeader, hideFooter };
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.top-area {
  height: 7%;
  border: 2px solid red;
  box-sizing: border-box;
}
.center-area {
  /* height: 80%; */
  border: 2px solid red;
  box-sizing: border-box;
  overflow: auto; /* 콘텐츠가 넘칠 경우 스크롤 */
}
.bottom-area {
  height: 10%;
  border: 2px solid red;
  box-sizing: border-box;
  text-align: left;
}
</style>
