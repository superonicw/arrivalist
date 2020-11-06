import React from 'react'
import { Provider } from 'react-redux'
import { runSaga } from 'redux-saga'

export const withProvider = (renderer, ui, mockStore) => {
  return renderer(<Provider store={mockStore}>{ui}</Provider>)
}

export async function recordSaga(saga, initialAction) {
  const dispatched = []

  await runSaga(
    {
      dispatch: action => dispatched.push(action),
    },
    saga,
    initialAction,
  ).done

  return dispatched
}
