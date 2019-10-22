import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavItem from '../src/NavItem';

Enzyme.configure({ adapter: new Adapter() });

describe('NavItem test', () => {
  const navItem = mount(
    <NavItem
      anchor="h-2-2"
      title="title2"
      subItems={[]}
      index="1.1"
      level={2}
      scrollBar="left"
      activeAnchor="h-2-2"
      showOrderNumber
    />
  );

  const link = navItem.find('.nav-link');

  it('title', () => {
    expect(link.text()).toEqual('1.1 title2');
  });

  it('scroll-bar', () => {
    expect(link.hasClass('scroll-bar-left')).toEqual(true);
  });

  it('active', () => {
    expect(link.hasClass('active')).toEqual(true);
  });

  it('padding should isn\'t rtl ', () => {
    expect(link.html()).toMatch(/padding-left: 35px;/);
  });

  it('href', () => {
    expect(link.html()).toMatch(/href="#h-2-2"/);
  });
});

describe('NavItem rtl', () => {
  const navItem = mount(
    <NavItem
      anchor="h-2-2"
      title="title2"
      subItems={[]}
      index="1.1"
      level={2}
      scrollBar="left"
      activeAnchor="h-2-2"
      showOrderNumber
      rtl
    />
  );
  const link = navItem.find('.nav-link');
  it('padding should be rtl', () => {
    expect(link.html()).toMatch(/padding-right: 35px;/);
  });
});
