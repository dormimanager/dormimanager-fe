<template>
  <div class="banner">
    <div class="banner-text">기숙사 세탁방 예약</div>
  </div>
  <div class="guide">
    <h2 class="title">기숙사 세탁방 예약/사용방법</h2>

    <div class="tabs">
      <div :class="['tab', activeTab === 'reserve' ? 'active' : '']"
           @click="activeTab = 'reserve'">세탁방 예약방법</div>
      <div :class="['tab', activeTab === 'use' ? 'active' : '']"
           @click="activeTab = 'use'">세탁방 사용방법</div>
    </div>
    <div class="tab-content">
      <ul v-if="activeTab === 'reserve'">
        <li>1. 원하는 위치 선택</li>
        <li>2. 원하는 위치 선택</li>
        <li>3. 원하는 위치 선택</li>
        <li class="note">※ 단, 한 타임당 1시간 30분(90분)으로 제한.</li>
      </ul>
      <ul v-else>
        <li>1. 전원 스위치 켜기</li>
        <li>2. 세제와 세탁물을 넣기</li>
        <li>3. 금액 맞게 투입</li>
        <li>4. 동작/일시정지 버튼 누르기</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name : 'laundryPC',
}

</script>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: 150px;
  background-image: url('@/assets/laundry.png');
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
}

.banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white; /* 이미지 위에서는 흰색이 잘 보임 */
  font-size: 28px;
  font-weight: bold;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6); /* 가독성 향상 */
}

.guide {
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  max-width: 700px;
  margin: 20px auto;
  font-family: sans-serif;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.tabs {
  display: flex;
  border: 1px solid #aaa;
  border-bottom: none;
}

.tab {
  flex: 1;
  padding: 10px;
  text-align: center;
  background: #f0f0f0;
  cursor: pointer;
  border-right: 1px solid #aaa;
  font-weight: bold;
}

.tab:last-child {
  border-right: none;
}

.tab.active {
  background: #bde5ff;
}

.tab-content {
  border: 1px solid #aaa;
  padding: 15px;
  background: white;
  font-size: 14px;
}

.tab-content ul {
  list-style: none;
  padding-left: 0;
}

.tab-content li {
  margin-bottom: 5px;
}

.note {
  color: #d33;
  font-size: 13px;
  margin-top: 5px;
}
</style>