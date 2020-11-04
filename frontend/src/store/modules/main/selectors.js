import { get } from 'lodash'

export const selectMainState = state => get(state, 'main')

export const selectTrips = state => get(state, 'main.trips')

export const selectLoading = state => get(state, 'main.loading')

export const selectError = state => get(state, 'main.error')
