import React from 'react'
import { mount } from 'enzyme'
import Tooltip from '../Tooltip'

const initialProps = {
  x: '2020-09-01',
  y: '12000',
  state: 'AL',
}

describe('Tooltip test', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Tooltip {...initialProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
