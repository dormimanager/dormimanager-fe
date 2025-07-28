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
      <p class="notice">
        ※ 6/2 ~ 6/31일까지 신청 부탁드립니다.<br />
        설문에 참여하지 않은 관생분들은 랜덤으로 방배정이 이뤄짐을 알려드립니다.<br /><br />
        기간 내에는 조회를 통해 자유롭게 수정 가능합니다.
      </p>
    </div>

    <!-- 결과 조회 -->
    <div class="map">
      <h2 class="title">결과 조회</h2>
      <div class="result-form">
        <input type="text" placeholder="학번" class="input-box" />
        <div class="input-with-button">
          <input type="password" placeholder="비밀번호" class="input-box" />
          <button class="result-btn">조회</button>
        </div>
      </div>
    </div>

    <div class="result-table">
      <h2 class="title">배정 결과</h2>
      <div class="table-wrapper">
        <table class="assignment-table">
          <thead>
          <tr>
            <th>생활관</th>
            <th>동</th>
            <th>호실</th>
            <th>룸메</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(student, index) in roommates" :key="index">
            <td>{{ student.dorm }}</td>
            <td>{{ student.building }}</td>
            <td>{{ student.room }}</td>
            <td>
              {{ student.id }} {{ student.name }}
              <button class="detail-btn">자세히</button>
            </td>
          </tr>
          </tbody>
        </table>

        <div class="survey-style">
          <div v-for="(student, index) in roommates" :key="index" class="style-block">
            <p>자신에게 더 맞는 생활 패턴 스타일은?</p>
            <label><input type="radio" value="morning" checked disabled /> 아침형</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";

const router = useRouter()

function survey() {
  router.push('/stu/survey')
}

const roommates = [
  { dorm: "2025****", name: "김0현", id: "2025****", building: "00동", room: "5520" },
  { dorm: "2025****", name: "조0현", id: "2025****", building: "00동", room: "5520" },
  { dorm: "2025****", name: "박0주", id: "2025****", building: "00동", room: "5520" },
  { dorm: "2025****", name: "이0소", id: "2025****", building: "00동", room: "5520" },
];

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

.application-btn {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.survey-btn, .search-btn {
  padding: 8px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}
.survey-btn {
  background-color: #b1dbf4;
}
.search-btn {
  background-color: #ccc;
}

.notice {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin-top: 10px;
}

.result-form {
  margin-top: 20px;
}
.input-box {
  width: 300px;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.input-with-button {
  display: flex;
  align-items: center;
}
.result-btn {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #b1dbf4;
  border: none;
  font-weight: bold;
  cursor: pointer;
}
.result-table {
  margin-top: 40px;
}
.table-wrapper {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.assignment-table {
  border-collapse: collapse;
  min-width: 400px;
}
.assignment-table th, .assignment-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
.detail-btn {
  background-color: #d6dee3;
  border: none;
  padding: 6px 12px;
  font-weight: bold;
  cursor: pointer;
}
.survey-style {
  background-color: #e7f6ff;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.style-block {
  font-size: 14px;
}

</style>
