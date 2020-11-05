import { handleActions } from 'redux-actions'
import { successAction, failAction } from 'utils/state-helpers'
import { LIST_TRIP, CLEAR_TRIP } from './actions'

export const INITIAL_STATE = {
  trips: [],
  loading: false,
  error: null,
}

export const reducer = handleActions(
  {
    [LIST_TRIP]: state => ({
      ...state,
      error: null,
      loading: true,
    }),

    [CLEAR_TRIP]: state => ({
      ...state,
      trips: [],
    }),

    [successAction(LIST_TRIP)]: (state, { payload }) => ({
      ...state,
      trips: payload,
      loading: false,
    }),

    [failAction(LIST_TRIP)]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload,
    }),
  },
  INITIAL_STATE,
)
