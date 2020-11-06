import React from 'react'
import { mount, shallow } from 'enzyme'
import { TripMock } from 'test/mocks'
import MapChart from '../MapChart'

const initialProps = {
  trips: TripMock,
}

describe('MapChart test', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<MapChart {...initialProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should show tooltip', () => {
    const wrapper = mount(<MapChart {...initialProps} />)
    wrapper.find('.rsm-geographies path').first().simulate('mouseenter')
    expect(wrapper.find('[data-id="tooltip"]').html()).toContain('Alabama')

    wrapper.find('.rsm-geographies path').first().simulate('mouseleave')
    expect(wrapper.find('[data-id="tooltip"]').html()).not.toContain('Alabama')
  })
})
