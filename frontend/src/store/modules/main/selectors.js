import { get } from 'lodash'

export const selectRushingState = state => get(state, 'rushing')

export const selectRushingData = state => get(state, 'rushing.data')

export const selectTeams = state => get(state, 'rushing.teams')

export const selectRushingLoading = state => get(state, 'rushing.loading')

export const selectRushingError = state => get(state, 'rushing.error')
