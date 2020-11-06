import axios from 'axios'
import { recordSaga } from 'test/utils'
import { TripMock } from 'test/mocks'
import * as actions from '../actions'
import { doListTrip } from '../sagas'

jest.mock('axios')

describe('Main sagas', () => {
  it('list trips', async () => {
    /* success */
    const successResponse = {
      trips: TripMock,
      data: {},
    }

    axios.get.mockResolvedValue(successResponse)

    const payload = {
      params: { states: 'AK,AL', start: '2020-09-01', end: '2020-10-31' },
    }

    let dispatched = await recordSaga(doListTrip, actions.listTrip(payload))

    expect(axios.get).toHaveBeenCalledWith('/trips/', payload)
    expect(dispatched).toContainEqual(
      actions.listTripSuccess(successResponse.data.trips),
    )

    /* fail */
    const failResponse = new Error('error')

    axios.get.mockRejectedValue(failResponse)

    dispatched = await recordSaga(doListTrip, actions.listTrip(payload))

    expect(axios.get).toHaveBeenCalledWith('/trips/', payload)
    expect(dispatched).toContainEqual(actions.listTripFail(failResponse))
  })
})
