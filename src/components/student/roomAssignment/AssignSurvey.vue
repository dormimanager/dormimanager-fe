<template>
  <div class="survey-header">
    <div class="survey-header-bar"></div>
    <div class="survey-header-content">
      <header class="survey-title">방 배정 설문 조사</header>
      <div class="survey-desc">
      기숙사를 붙은 관생들에 한하여 방을 배정하기 위한 설문조사입니다.<br />
      방을 배정할 때 참고하여 배정할 예정이오니, 본인에게 해당되는 사항을 선택 후 제출해 주십시요.<br />
        <br />
      ※ 제출기한 : 25.07.1 ~ 25.08.31
      </div>
    </div>

    <form class="survey-form" @submit.prevent="submitSurvey">
      <section class="survey-field">
        <div class="survey-label">자신에게 더 맞는 생활 패턴 스타일은?</div>
        <div class="survey-options">
          <label class="survey-radio">
            <input type="radio" name="lifestyle" value="아침형" v-model="lifestyle" />
            아침형
          </label>
          <label class="survey-radio">
            <input type="radio" name="lifestyle" value="야행성" v-model="lifestyle" />
            야행성
          </label>
        </div>
      </section>
      <section class="survey-field">
        <div class="survey-label">흡연 여부는?</div>
        <div class="survey-options">
          <label class="survey-radio">
            <input type="radio" name="smoking" value="O" v-model="smoking" />
            O
          </label>
          <label class="survey-radio">
            <input type="radio" name="smoking" value="X" v-model="smoking" />
            X
          </label>
        </div>
      </section>
      <section class="survey-field">
        <div class="survey-label">다른 사람을 처음 만났을 때 어떤 성향인가요?</div>
        <div class="survey-options">
          <label class="survey-radio">
            <input type="radio" name="personality" value="외향형" v-model="personality" />
            외향형(E)
          </label>
          <label class="survey-radio">
            <input type="radio" name="personality" value="내향성" v-model="personality" />
            내향성(I)
          </label>
        </div>
      </section>
      <section class="survey-field">
        <div class="survey-label">평소 생활환경은 어떻게 유지하시나요?</div>
        <div class="survey-options">
          <label class="survey-radio">
            <input type="radio" name="cleanliness" value="깔끔" v-model="cleanliness" />
            깔끔한 편
          </label>
          <label class="survey-radio">
            <input type="radio" name="cleanliness" value="보통" v-model="cleanliness" />
            보통(상관없음)
          </label>
        </div>
      </section>
      <section class="survey-field">
        <div class="survey-label">소음 민감도는 어떻게 되나요?</div>
        <div class="survey-options">
          <label class="survey-radio">
            <input type="radio" name="noise" value="조용" v-model="noise" />
            조용함 선호
          </label>
          <label class="survey-radio">
            <input type="radio" name="noise" value="무관" v-model="noise" />
            상관없음
          </label>
        </div>
      </section>
      <button class="survey-btn" type="submit">
        제출
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const lifestyle = ref('');
const smoking = ref('');
const personality = ref('');
const cleanliness = ref('');
const noise = ref('');

const submitSurvey = async () => {
  if (!lifestyle.value || !smoking.value || !personality.value || !cleanliness.value || !noise.value) {
    alert('모든 문항에 응답해 주세요.');
    return;
  }

  const payload = {
    studentId: authStore.studentId,
    lifestyle: lifestyle.value,
    smoking: smoking.value,
    personality: personality.value,
    cleanliness: cleanliness.value,
    noise: noise.value
  };

  try {
    await axios.post('/api/stu/survey', payload);
    alert('설문이 제출되었습니다. 이전 페이지로 이동합니다.');
    router.push('/stu/roomassignment');
  } catch (error) {
    console.error('설문 제출 중 오류:', error.response || error);
    alert('제출에 실패했습니다. 잠시 후 다시 시도해 주세요.');
  }
};
</script>

<style scoped>
.survey-header {
  position: relative;
  width: 90%;
  margin: 48px auto;
  background: #ffffff;
  border: 1.5px solid #eaf1fb;
  border-radius: 20px;
  box-shadow: 0 6px 28px rgba(0, 60, 155, 0.08);
  padding: 40px 32px 32px 32px;
  font-family: 'Noto Sans KR', sans-serif;
}

.survey-header-bar {
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  height: 20px;
  background-color: #9ADCF6;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.survey-title {
  font-size: 27px;
  font-weight: 700;
  border-radius: 10px;
  text-align: left;
  margin-bottom: 30px;
  letter-spacing: -0.5px;
  margin-left: 17px;
  margin-top : 12px;
}

.survey-desc {
  color: #111;
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 28px;
  text-align: left;
  margin-left : 17px;
}

.survey-header-content {
  border: 0.5px solid #D9D9D9;
  margin-bottom: 20px;
  border-radius: 8px;
}

.survey-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.survey-field {
  background: #f6fafe;
  border: 1px solid #d0e4f7;
  border-radius: 8px;
  padding: 18px 16px 12px 16px;
  height: 95px;
}

.survey-label {
  font-size: 18px;
  font-weight: 500;
  color: #22305b;
  margin-bottom: 25px;
  text-align: left;
}

.survey-options {
  display: flex;
  gap: 22px;
}

.survey-radio {
  font-size: 17px;
  color: #505050;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.survey-radio input[type='radio'] {

  width: 1.06em;
  height: 1.06em;
}

.survey-btn {
  width: 100%;
  padding: 12px 0 12px 0;
  background: #9ADCF6;
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 1.07rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-top: 12px;
  transition: background 0.16s;
  box-shadow: 0 2px 8px rgba(50, 144, 255, 0.04);
  cursor: pointer;
}

.survey-btn:hover {
  background: linear-gradient(90deg, #307fd7 15%, #3bb3e7 93%);
}
</style>
