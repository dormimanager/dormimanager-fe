<script setup>

</script>

<template>
  <div class="banner">
    <div class="banner-text">벌점</div>
  </div>
  <div class="wrapper">
    <h2 class="title">벌점</h2>

    <!-- 벌점 요약 영역 -->
    <div class="summary-section">
      <div class="star-score">
        <div class="star">⭐</div>
        <div class="score">3점</div>
        <ul class="legend">
          <li>⭐ 양호 0 ~ 6점</li>
          <li>🟠 주의 7 ~ 9점</li>
          <li>🔴 경고 10 ~ 15점</li>
        </ul>
      </div>
      <div class="chart-info">
        <div class="bar-chart">
          <div class="bar-labels">
            <span>평균</span><span>나</span>
          </div>
          <div class="bars">
            <div class="bar avg" style="height: 80px;"></div>
            <div class="bar me" style="height: 30px;"></div>
          </div>
        </div>
        <div class="remaining">
          <p>퇴소까지 <strong>12점</strong><br>남았습니다</p>
          <button class="apply-btn">이의신청</button>
        </div>
      </div>
    </div>

    <!-- 벌점 상세 테이블 -->
    <div class="detail-table">
      <table>
        <thead>
        <tr>
          <th>번호</th>
          <th>사유</th>
          <th>벌점</th>
          <th>받은 날짜</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>관리 물건의 적발</td>
          <td>2</td>
          <td>05.02</td>
        </tr>
        <tr>
          <td>2</td>
          <td>타인에게 피해를 주는 행위 : 소음</td>
          <td>1</td>
          <td>05.31</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- 그래프 -->
    <div class="graph">
      <h3>그래프</h3>
      <p class="date-label">05.02 ~ 05.31</p>
    </div>
  </div>
</template>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: 250px;
  background-image: url('@/assets/dermit.png');
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
.wrapper {
  max-width: 1200px;
  padding: 0 30px;
  margin: 0 auto;
  box-sizing: border-box;
}
.title {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: left;
  margin-top: 100px;
}

.summary-section {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
  gap: 40px;
}

.star-score {
  flex: 1;
  min-width: 200px;
}
.star {
  font-size: 40px;
  color: green;
}
.score {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}
.legend li {
  font-size: 14px;
  margin: 2px 0;
}

.chart-info {
  display: flex;
  align-items: center;
  flex: 2;
  gap: 30px;
}
.bar-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bar-labels {
  display: flex;
  justify-content: space-between;
  width: 80px;
  margin-bottom: 5px;
  font-size: 14px;
}
.bars {
  display: flex;
  gap: 20px;
}
.bar {
  width: 30px;
  background-color: lightgray;
}
.bar.avg {
  background-color: #e59866;
}
.bar.me {
  background-color: #5dade2;
}
.remaining {
  text-align: center;
}
.apply-btn {
  margin-top: 10px;
  padding: 6px 12px;
  font-size: 14px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.detail-table table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.detail-table th,
.detail-table td {
  padding: 10px;
  text-align: center;
}
.detail-table th {
  background-color: #79c1ec;
}

.graph {
  margin-top: 40px;
  text-align: center;
}
.graph-img {
  width: 100%;
  max-width: 500px;
}
.date-label {
  margin-top: 10px;
  font-size: 14px;
  color: gray;
}

</style>