import { handleActions } from 'redux-actions'
import { successAction, failAction } from 'utils/state-helpers'
import { LIST_RECORD } from './actions'

export const INITIAL_STATE = {
  data: {
    record: [],
    meta: {
      page: 1,
      page_size: 10,
      total: 0,
    },
  },
  loading: false,
  error: null,
}

export const reducer = handleActions(
  {
    [LIST_RECORD]: state => ({
      ...state,
      error: null,
      loading: true,
    }),

    [successAction(LIST_RECORD)]: (state, { payload }) => ({
      ...state,
      data: payload,
      loading: false,
    }),

    [failAction(LIST_RECORD)]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload,
    }),
  },
  INITIAL_STATE,
)
