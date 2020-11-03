import { createAction } from 'redux-actions'
import { successAction, failAction } from 'utils/state-helpers'

export const LIST_TRIP = 'LIST_TRIP'

export const listTrip = createAction(LIST_TRIP)
export const listTripSuccess = createAction(successAction(LIST_TRIP))
export const listTripFail = createAction(failAction(LIST_TRIP))
