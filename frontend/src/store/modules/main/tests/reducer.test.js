import { pick } from 'lodash'
import { TripMock } from 'test/mocks'
import * as actions from '../actions'
import { reducer, INITIAL_STATE } from '../reducer'

describe('Main reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE)
  })

  it('should return loading state', () => {
    const nextState = reducer(INITIAL_STATE, actions.listTrip())

    expect(pick(nextState, ['loading', 'error'])).toEqual({
      loading: true,
      error: null,
    })
  })

  it('should return success state', () => {
    const payload = TripMock
    const action = actions.listTripSuccess(payload)
    const nextState = reducer(INITIAL_STATE, action)

    expect(pick(nextState, ['trips', 'loading'])).toEqual({
      trips: payload,
      loading: false,
    })
  })

  it('should return fail state', () => {
    const payload = new Error('Error')
    const action = actions.listTripFail(payload)
    const nextState = reducer(INITIAL_STATE, action)

    expect(pick(nextState, ['error', 'loading'])).toEqual({
      loading: false,
      error: payload,
    })
  })

  it('should clear trips', () => {
    const action = actions.clearTrip()
    const nextState = reducer(INITIAL_STATE, action)

    expect(nextState.trips).toEqual([])
  })
})
