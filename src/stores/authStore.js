// stores/authStore.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    username: '',      // 사용자명
    studentId: '',     // 학번
    role: ''           // 역할
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    setUserInfo({ username, studentId, role }) {
      this.username = username
      this.studentId = studentId
      this.role = role
    },
    clearToken() {
      this.token = null
      this.username = ''
      this.studentId = ''
      this.role = ''
    }
  },
  persist: true
})
