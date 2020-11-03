import axios from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'

import * as actions from './actions'

export const doListTrip = function* ({ payload }) {
  try {
    const res = yield call(axios.get, '/trips/', payload)
    yield put(actions.listTripSuccess(res.data.trips))
  } catch (error) {
    yield put(actions.listTripFail(error))
  }
}

export const saga = function* () {
  yield takeEvery(actions.LIST_TRIP, doListTrip)
}
