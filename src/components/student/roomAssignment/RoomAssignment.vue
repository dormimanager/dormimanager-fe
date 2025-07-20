<template>
  <div class="banner">
    <div class="banner-text">방 배정</div>
  </div>
  <div class="wrapper">
    <div class="application">
      <h2 class="title">방 배정 신청</h2>
      <div class="application-btn">
        <button class ="survey-btn" @click="survey">신청하기</button>
        <button class ="search-btn">신청내역</button>
      </div>
    </div>

    <div class="map">
      <h2 class="title">결과 조회</h2>

    </div>


  </div>
</template>

<script setup>

import {useRouter} from "vue-router";

const router = useRouter()

function survey() {
  router.push('/stu/survey')
}
</script>

<style scoped>
/* 기본 스타일 */
.wrapper {
  max-width: 1200px;
  padding: 0 30px;
  margin: 0 auto;
  box-sizing: border-box;
}
.banner {
  position: relative;
  width: 100%;
  height: 250px;
  background-image: url('@/assets/room.png');
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
}
.banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 50px;
  font-weight: bold;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
}
.application, .map{
  margin: 30px 0;
  padding: 0;
  font-family: sans-serif;
  text-align: left;
}

.title {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: left;
  margin-top: 100px;
}

/* 모바일 반응형 */
@media (max-width: 768px) {
  .wrapper {
    max-width: 100%;
    padding: 0 12px;
  }
  .banner {
    height: 120px;
  }
  .banner-text {
    font-size: 24px;
  }
  .application, .map {
    margin: 18px 0;
  }
  .title {
    font-size: 18px;
    margin-top: 40px;
    margin-bottom: 10px;
  }
}
</style>
