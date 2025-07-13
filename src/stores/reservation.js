import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useReservationStore = defineStore('reservation', {
    state: () => ({
        reservedTimes: [],
    }),
    actions: {
        async fetchReservations(laundryId, date, reservType) {
            if (!laundryId || !date|| !reservType) return

            const { data } = await api.get('/api/stu/reservation/laundry/times', {
                params: { laundryId, date, reservType },
            })
            this.reservedTimes = data.reservedTimes
        }
    }
})