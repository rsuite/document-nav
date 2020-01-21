import React from 'react';
import { findDOMNode } from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Nav, Content, NavProvider, NavItem } from '../src';

Enzyme.configure({ adapter: new Adapter() });

describe('Nav.Item', () => {
  const wrapper = mount(
    <div>
      <Nav>
        <NavItem title="一级标题" anchor="h1">
          <NavItem title="二级标题" anchor="h1-1" />
        </NavItem>
      </Nav>
      <Content>
        <h1 id="h1">一级标题</h1>
        <h2 id="h1-1">二级标题</h2>
      </Content>
    </div>
  );

  const instance = findDOMNode(wrapper.instance());

  it('padding should be normal', () => {
    const link = wrapper.find('.nav-link').last();
    expect(link.html()).toMatch(/padding-left: 35px;/);
  });
});

describe('Nav.Item rtl', () => {
  const wrapper = mount(
    <div>
      <Nav rtl>
        <NavItem title="一级标题" anchor="h1">
          <NavItem title="二级标题" anchor="h1-1" />
        </NavItem>
      </Nav>
      <Content>
        <h1 id="h1">一级标题</h1>
        <h2 id="h1-1">二级标题</h2>
      </Content>
    </div>
  );

  const instance = findDOMNode(wrapper.instance());

  it('padding should be right', () => {
    const link = wrapper.find('.nav-link').last();
    expect(link.html()).toMatch(/padding-right: 35px;/);
  });
});
