import { defineStore } from 'pinia'
import axios from 'axios'

export const useReservationStore = defineStore('reservation', {
    state: () => ({
        reservedTimes: [],
    }),
    actions: {
        async fetchReservations(laundryId, date) {
            if (!laundryId || !date) return
            const { data } = await axios.get('/api/stu/reservation/laundry/times', {
                params: { laundryId, date }
            })
            this.reservedTimes = data.reservedTimes
        }
    }
})