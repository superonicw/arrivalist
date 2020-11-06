import React from 'react'
import { mount, shallow } from 'enzyme'
import { createStore } from 'redux'
import { set } from 'lodash'
import { Button, CircularProgress, Select, TextField } from '@material-ui/core'
import { listTrip, clearTrip } from 'store/modules/main'
import reducer from 'store/reducers'
import { withProvider } from 'test/utils'
import { TripMock } from 'test/mocks'
import Dashboard from './index'

const initialState = {
  main: {
    trips: TripMock,
    loading: false,
    error: null,
  },
}

describe('Dashboard page test', () => {
  let wrapper
  let store

  beforeEach(() => {
    store = createStore(reducer, initialState)
    store.dispatch = jest.fn()
    wrapper = withProvider(mount, <Dashboard />, store)
  })

  it('renders correctly', () => {
    expect(withProvider(shallow, <Dashboard />, store)).toMatchSnapshot()
  })

  it('should handle search', () => {
    const states = ['AK', 'AL']
    const start = '2020-08-01'

    wrapper
      .find(Select)
      .props()
      .onChange({ target: { value: states } })

    wrapper
      .find(TextField)
      .first()
      .props()
      .onChange({ target: { value: start } })

    wrapper.find(Button).last().simulate('click')

    const params = {
      states: states.join(','),
      start,
    }

    expect(store.dispatch).toHaveBeenLastCalledWith(listTrip({ params }))

    wrapper.find(Button).first().simulate('click')
    expect(store.dispatch).toHaveBeenLastCalledWith(clearTrip())
  })

  it('should show loader', () => {
    store = createStore(reducer, set({ ...initialState }, 'main.loading', true))
    wrapper = withProvider(mount, <Dashboard />, store)

    expect(wrapper.find(CircularProgress).length).toBe(1)
  })
})
