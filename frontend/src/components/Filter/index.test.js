import React from 'react'
import { mount } from 'enzyme'
import { Select, TextField } from '@material-ui/core'
import Filter from './index'

const initialProps = {
  states: ['AK', 'AL'],
  dates: { start: '2020-09-01', end: '2020-10-31' },
  onStatesChange: jest.fn(),
  onDatesChange: jest.fn(),
}

describe('Filter test', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<Filter {...initialProps} />)
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should trigger change', () => {
    const states = ['AK']
    const start = '2020-08-01'
    const end = '2020-08-31'

    wrapper
      .find(Select)
      .props()
      .onChange({ target: { value: states } })
    expect(initialProps.onStatesChange).toHaveBeenCalledWith(states)

    wrapper
      .find(TextField)
      .first()
      .props()
      .onChange({ target: { value: start } })
    expect(initialProps.onDatesChange).toHaveBeenCalledWith({
      ...initialProps.dates,
      start,
    })

    wrapper
      .find(TextField)
      .last()
      .props()
      .onChange({ target: { value: end } })
    expect(initialProps.onDatesChange).toHaveBeenCalledWith({
      ...initialProps.dates,
      end,
    })
  })
})
