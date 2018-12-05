import React from 'react';
import { shallow } from 'enzyme';

import { Foo } from '../foo';

const toggle = jest.fn();

function setup() {
  return {
    toggle,
    wrapper: shallow(<Foo isOpen={true} toggle={toggle} />)
  }
}
describe('admin foo', () => {
  it('should render admin text', () => {
    const { wrapper } = setup();
    const admin = wrapper.find('.admin');
    expect(admin.childAt(0).text()).toBe('admin ');
  });

  it('should render true', () => {
    const { wrapper } = setup();
    const admin = wrapper.find('.admin');
    expect(admin.childAt(1).text()).toBe('true');
  });

  it('should call toggle', () => {
    const { wrapper, toggle } = setup();
    const button = wrapper.find('button');
    const { onClick} = button.props();
    onClick();
    expect(toggle).toBeCalled();
  });
});
