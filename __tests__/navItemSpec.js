import React from 'react';
import { shallow, mount, render } from 'enzyme';
import NavItem from '../src/component/NavItem';

describe('NavItem test', () => {
  const navItem = mount(
    <NavItem
      anchor="h-2-2"
      title="title2"
      subItems={[]}
      index="1.1"
      level={2}
    />, {
      context: {
        scrollBar: 'left',
        activeAnchor: 'h-2-2',
        showOrderNumber: true
      }
    }
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

  it('padding', () => {
    expect(link.html()).toMatch(/padding-left: 35px;/);
  });

  it('href', () => {
    expect(link.html()).toMatch(/href="#h-2-2"/);
  });
});