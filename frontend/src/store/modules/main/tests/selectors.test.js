import { TripMock } from 'test/mocks'
import * as selectors from '../selectors'

const state = {
  main: {
    data: TripMock,
    loading: true,
    error: null,
  },
}

describe('Main selectors', () => {
  it('tests', () => {
    const { main } = state

    expect(selectors.selectMainState(state)).toEqual(main)
    expect(selectors.selectTrips(state)).toEqual(main.trips)
    expect(selectors.selectLoading(state)).toEqual(main.loading)
    expect(selectors.selectError(state)).toEqual(main.error)
  })
})
