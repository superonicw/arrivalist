import React from 'react'
import { mount, shallow } from 'enzyme'
import { TripMock } from 'test/mocks'
import LineChart from '../LineChart'

const initialProps = {
  trips: TripMock,
}

describe('LineChart test', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<LineChart {...initialProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders without chart', () => {
    const wrapper = mount(<LineChart {...initialProps} />)
    wrapper.setProps({ trips: [] })

    expect(wrapper).toMatchSnapshot()

    wrapper.unmount()
  })
})
