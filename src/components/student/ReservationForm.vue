<template>
  <div class="popup">
    <h3 class="title">예약하기</h3>
    <button class="close-btn" @click="$emit('close')">X</button>

    <!--예약할 데이터 선택-->
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
        <!--이미 예약된 시간대는 disabled-->
        <select v-model="selectedTime">
          <option
              v-for="time in timeSlots"
              :key="time.value"
              :value="time.value"
              :disabled="reservedTimes.includes(time.value)"
          >
            {{ time.label }}<span v-if="reservedTimes.includes(time.value)"> (예약됨)</span>
          </option>
        </select>
      </div>
    </div>

    <button class="action-btn" @click="reserve">선택</button>

    <hr />

    <!-- 예약 내역 리스트-->
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
import { useReservationStore } from '@/stores/reservation' //예약내역 pinia에 저장할려고
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore' //학번가져오려고


// 기기명 → 내부 ID 매핑 함수
// 건물도 같이 고려
function getLaundryId(buildingId, machineName) {
  const laundryIdMap = {
    1: { // 1동
      "세탁기 1": 1,
      "세탁기 2": 2,
      "세탁기 3": 3,
      "세탁기 4": 4,
      "건조기 1": 5,
      "건조기 2": 6,
    },
    2: { // 2동
      "세탁기 1": 7,
      "세탁기 2": 8,
      "세탁기 3": 9,
      "세탁기 4": 10,
      "건조기 1": 11,
      "건조기 2": 12,
    },
    3: { //3동
      "세탁기 1": 13,
      "세탁기 2": 14,
      "세탁기 3": 15,
      "세탁기 4": 16,
      "건조기 1": 17,
      "건조기 2": 18,
    }
  };
  return laundryIdMap[buildingId]?.[machineName];
}

//기기명 > 예약 타입으로 반환
function getReservType(machineName) {
  return machineName.startsWith("세탁기") ? "세탁기" : "건조기";
}

// 날짜+타임 → ISO DateTime 문자열 생성
// timeValue는 "1"~"9", dateStr은 "YYYY-MM-DD"
function getReservTime(dateStr, timeValue) {
  const timeMap = {
    "1": "08:00:00",
    "2": "09:30:00",
    "3": "11:00:00",
    "4": "12:30:00",
    "5": "14:00:00",
    "6": "15:30:00",
    "7": "17:00:00",
    "8": "18:30:00",
    "9": "20:00:00"
  };
  return `${dateStr}T${timeMap[timeValue]}`;
}

// 건물명 → ID 매핑 함수
function getBuildingId(buildingName) {
  const map = {
    "1동": 1,
    "2동": 2,
    "3동": 3
  };
  return map[buildingName] || 0;
}

// 학번 가져오기
function getStudentId() {
  const authStore = useAuthStore()
  return authStore.studentId
}

// Pinia 스토어 인스턴스 생성 및 상태 참조
const reservationStore = useReservationStore()
const { reservedTimes } = storeToRefs(reservationStore)
// Pinia store(reservationStore)의 reservedTimes 상태를 컴포넌트에서 반응형으로 사용

// 부모 컴포넌트(laundryPC)로부터 전달받는 props(선택된 동)
const props = defineProps({
  selectedBuilding: {
    type: String,
    required: true
  }
});


// 예약 가능한 기기 목록
const machines = ["세탁기 1", "세탁기 2", "세탁기 3", "세탁기 4", "건조기 1", "건조기2"];

// 예약 가능한 시간대 목록
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

// 선택된 기기/날짜/시간 상태값 (v-model로 양방향 바인딩)
const selectedMachine = ref(machines[0]);
const selectedDate = ref("");
const selectedTime = ref(timeSlots[0].value);

// 클라이언트 측 예약 내역(서버와 연동 X, UI 표시용)
const reservations = ref([

]);

// 선택된 기기/날짜가 바뀔 때마다 예약 현황 새로 불러오기
watch([selectedMachine, selectedDate, props.selectedBuilding], ([newMachine, newDate, newBuilding]) => {
  if (newMachine && newDate && newBuilding) {
    const buildingId = getBuildingId(newBuilding);
    const laundryId = getLaundryId(buildingId, newMachine);
    if (laundryId) {
      reservationStore.fetchReservations(laundryId, newDate);
    }
  }
});


// 날짜 포맷 변환 함수 (YYYY.MM.DD)
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = (d.getMonth() + 1).toString().padStart(2, "0");
  const dd = d.getDate().toString().padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
};

// 시간 value → 라벨 변환 함수
const getTimeLabel = (value) => {
  const slot = timeSlots.find((s) => s.value === value);
  return slot ? slot.label : "";
};

// 예약 내역에서 항목 삭제
const removeReservation = (idx) => {
  reservations.value.splice(idx, 1);
};

// 예약 버튼 활성화 조건(모든 값이 입력되어야 함)
const canReserve = computed(() => {
  // 예약에 필요한 값 모두 있으면 활성화
  return selectedMachine.value && selectedDate.value && selectedTime.value;
});

// 예약 요청 함수(서버에 POST, 성공 시 예약 현황 갱신)
const reserve = async() => {
  // 중복 체크(같은 기기, 날짜, 시간대 중복 예약 금지)
  // const exists = reservations.value.some(
  //     (r) =>
  //         r.machine === selectedMachine.value &&
  //         r.date === selectedDate.value &&
  //         r.time === selectedTime.value
  // );

  if (reservedTimes.value.includes(selectedTime.value)) {
    alert("이미 예약된 시간대입니다.");
    return;
  }

  const buildingId = getBuildingId(props.selectedBuilding);
  const laundryId = getLaundryId(buildingId, selectedMachine.value);
  // 서버에 예약 요청 보내기
  try {
    // 서버에 예약 요청
    await axios.post('/api/stu/reservation/laundry', {
      laundryId, // 수정된 부분
      reservTime: getReservTime(selectedDate.value, selectedTime.value),
      buildingId,
      reservType: getReservType(selectedMachine.value),
      studentId: getStudentId(),
      studyroomId: null
    }, {
      headers: {
        studentId: getStudentId(),
      }
    });
    alert('예약 성공!');
    // 예약 내역 다시 불러오기
    reservationStore.fetchReservations(selectedMachine.value, selectedDate.value);
  } catch (e) {
    alert(e.response?.data || '예약 실패(이미 예약된 시간대일 수 있습니다)');
  }

  // reservations.value.push({
  //   machine: selectedMachine.value,
  //   date: selectedDate.value,
  //   time: selectedTime.value,
  // });

  //입력값 초기화
  selectedDate.value = "";
  selectedTime.value = timeSlots[0].value;
  selectedMachine.value = machines[0];
};

const emit = defineEmits(['close']);

// 취소 버튼 클릭 시 입력값 초기화 및 팝업 닫기
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
