
import React from 'react';
import { findDOMNode } from 'react-dom'
import { mount } from 'enzyme';
import { Nav, Content, NavProvider, NavItem } from '../src';

describe('Nav test with auto', () => {
  const wrapper = mount(
    <NavProvider>
      <Nav />
      <Content>
        <h2 id="h2-2">二级标题</h2>
      </Content>
    </NavProvider>
  );

  const instance = findDOMNode(wrapper.instance());

  it('nav should be render', () => {
    expect(wrapper.find('.page-nav').exists()).toEqual(true);
  });

  it('href == id', () => {
    const href =  instance.querySelector('.nav-link').getAttribute('href').replace('#', '');
    const id = instance.querySelector('h2').id;
    expect(href === id).toEqual(true);
  });

});

