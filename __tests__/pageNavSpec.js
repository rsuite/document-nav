import React from 'react';
import { findDOMNode } from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Nav, Content, NavProvider, NavItem } from '../src';

Enzyme.configure({ adapter: new Adapter() });

describe('Nav test with auto', () => {
  const wrapper = mount(
    <div>
      <NavProvider>
        <Nav />
        <Content>
          <h2 id="h2-2">二级标题</h2>
        </Content>
      </NavProvider>
    </div>
  );

  const instance = findDOMNode(wrapper.instance());

  it('nav should be render', () => {
    expect(wrapper.find('.document-nav').exists()).toEqual(true);
  });

  it('href == id', () => {
    const href = instance
      .querySelector('.nav-link')
      .getAttribute('href')
      .replace('#', '');
    const id = instance.querySelector('h2').id;
    expect(href === id).toEqual(true);
  });
});
