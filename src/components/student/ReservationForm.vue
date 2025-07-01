<template>
  <div class="popup">
    <h3 class="title">예약하기</h3>
    <button class="close-btn" @click="$emit('close')">X</button>

    <div class="popup-body">
      <div class="form-group">
        <label class="text">동</label>
        <span class="building-value">{{ props.selectedBuilding }}</span>
      </div>

      <div class="form-group">
        <label class="text">기기명</label>
        <select v-model="selectedMachine">
          <option v-for="machine in machines" :key="machine" :value="machine">{{ machine }}</option>
        </select>
      </div>

      <div class="form-group">
        <label class="text">날짜</label>
        <input type="date" v-model="selectedDate" />
      </div>

      <div class="form-group">
        <label class="text">시간대</label>
        <select v-model="selectedTime">
          <option v-for="time in timeSlots" :key="time.value" :value="time.value">
            {{ time.label }}
          </option>
        </select>
      </div>
    </div>

    <button class="action-btn" @click="reserve">선택</button>

    <hr />

    <div class="reservation-list">
      <h3>예약 내용</h3>
      <ul>
        <li v-for="(res, index) in reservations" :key="index" class="reservation-item">
          {{ res.machine }} | {{ formatDate(res.date) }} | {{ getTimeLabel(res.time) }}
          <button @click="removeReservation(index)">X</button>
        </li>
      </ul>
    </div>

    <div class="btn-area">
      <button @click="cancel">취소</button>
      <button @click="reserve" :disabled="!canReserve">예약</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  selectedBuilding: {
    type: String,
    required: true
  }
});

const machines = ["세탁기 1", "세탁기 2", "세탁기 3", "세탁기 4", "건조기 1", "건조기2"];

const timeSlots = [
  { value: "1", label: "1타임 8:00~9:30" },
  { value: "2", label: "2타임 9:30~11:00" },
  { value: "3", label: "3타임 11:00~12:30" },
  { value: "4", label: "4타임 12:30~14:00" },
  { value: "5", label: "5타임 14:00~15:30" },
  { value: "6", label: "6타임 15:30~17:00" },
  { value: "7", label: "7타임 17:00~18:30" },
  { value: "8", label: "8타임 18:30~20:00" },
  { value: "9", label: "9타임 20:00~21:30" },

];

const selectedMachine = ref(machines[0]);
const selectedDate = ref("");
const selectedTime = ref(timeSlots[0].value);

const reservations = ref([

]);

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = (d.getMonth() + 1).toString().padStart(2, "0");
  const dd = d.getDate().toString().padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
};

const getTimeLabel = (value) => {
  const slot = timeSlots.find((s) => s.value === value);
  return slot ? slot.label : "";
};

const removeReservation = (idx) => {
  reservations.value.splice(idx, 1);
};

const canReserve = computed(() => {
  // 예약에 필요한 값 모두 있으면 활성화
  return selectedMachine.value && selectedDate.value && selectedTime.value;
});

const reserve = () => {
  // 중복 체크(같은 기기, 날짜, 시간대 중복 예약 금지)
  const exists = reservations.value.some(
      (r) =>
          r.machine === selectedMachine.value &&
          r.date === selectedDate.value &&
          r.time === selectedTime.value
  );
  if (exists) {
    alert("이미 예약된 시간입니다.");
    return;
  }

  reservations.value.push({
    machine: selectedMachine.value,
    date: selectedDate.value,
    time: selectedTime.value,
  });

  // 예약 후 선택 초기화(옵션)
  // selectedDate.value = "";
  // selectedTime.value = timeSlots[0].value;
};

const emit = defineEmits(['close']);

const cancel = () => {
  // 팝업 닫기 등 처리 (부모 컴포넌트에서 구현)
  // 여기서는 이벤트만 발생시킴
  // 필요 시 reset도 가능
  selectedDate.value = "";
  selectedTime.value = timeSlots[0].value;
  selectedMachine.value = machines[0];
  // 부모에게 닫기 요청
  emit('close');//는 template 상단에 X 버튼에서 처리
};

</script>

<style scoped>
/*css 추후 손보기*/
.popup-body {
  margin-bottom: 15px;
  overflow-y: auto;     /* 내부 스크롤 */
  padding-right: 8px;   /* (선택) 스크롤 여백 */
}

.title {
  text-align: left;
  font-size: 20px;
  margin-bottom: 40px;
}

.text {
  margin-right: 20px;
  font-size: 16px;
}

.building-value {
  margin-left: 10px;
  font-weight: 600;
  font-size: 16px;
}

.popup {
  width: 600px;
  height: 500px;
  padding: 16px 20px;
  border: 4px solid #bde5ff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  font-family: "Noto Sans KR", sans-serif;
  z-index: 1001; /* 다른 요소보다 위에 오도록 */
  font-size: 14px;
  box-sizing: border-box;
  display: flex;              /* 추가 */
  flex-direction: column;     /* 추가 */
}

h3 {
  margin: 0 0 10px 0;
  font-weight: 700;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-weight: bold;
  cursor: pointer;
}

.form-group {
  display: flex;           /* 핵심! 라벨과 입력을 수평으로 */
  align-items: center;     /* 세로 중앙 정렬 */
  text-align: left;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 100px;
}

.form-group label {
  flex: 0 0 70px;          /* 너비 고정 */
  text-align: right;       /* 끝 맞춤 */
  margin-right: 10px;      /* 콜론 뒤 여백 */
  font-weight: 600;
}

.form-group label::after {
  content: " :";
  margin-left: 2px;
}

.form-group select,
.form-group input[type="date"] {
  flex: 2 0 auto;
  padding: 4px 8px;
  font-size: 13px;
}

hr {
  margin: 15px 0;
  border-color: #ddd;
}

h3 {
  margin-bottom: 6px;
  margin-left: 10px;
  text-align: left;
}

.action-btn {
  font-weight: 600;
  cursor: pointer; /*마우스 포인터 변경*/
  background-color: #79c1ec;
  font-size: 15px;
  border : none;
  width : 70px;
  margin-left: auto;
}

.reservation-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 13px;
}

.reservation-item button {
  background: transparent;
  border: none;
  color: #999;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
}

.btn-area {
  margin-top: auto;     /* 기존 margin-top: 10px → 수정 */
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-area button {
  min-width: 70px;
  padding: 6px 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.btn-area button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-area button:nth-child(2) {
  background-color: #79c1ec;
  border : none;
}

.reservation-list {
  max-height: 100px;    /* 원하는 높이로 조정 */
  overflow-y: auto;     /* 세로 스크롤 자동 생성 */
  margin-bottom: 10px;  /* (선택) 하단 여백 */
  padding-right: 8px;   /* (선택) 스크롤바 공간 확보 */
}
</style>
