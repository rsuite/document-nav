import React from 'react';
import { shallow, mount, render } from 'enzyme';
import createNavItems from '../src/util/createNavItems';

describe('createNavItems test', () => {
  it('list length is 0', () => {
    expect(createNavItems([])).toBeNull();
  });

  it('list length is 1', () => {
    const navItems = mount(createNavItems([{
      title: 'title1',
      anchor: 'h-1',
      level: 2
    }], 2, '1.1'));
    expect(navItems.props()).toMatchObject({
      title: 'title1',
      anchor: 'h-1',
      level: 3,
      index: '1.1.1'
    });
  });

  const list = [
    {
      title: 'title1',
      anchor: 'h-1',
      level: 3
    },
    {
      title: 'title2',
      anchor: 'h-2',
      level: 4
    },
    {
      title: 'title3',
      anchor: 'h-3',
      level: 2
    },
    {
      title: 'title4',
      anchor: 'h-4',
      level: 3
    },
    {
      title: 'title5',
      anchor: 'h-5',
      level: 2
    },
  ];
  const navItems = createNavItems(list, 1, '1.1');

  it('list ', () => {
    const navItem = mount(navItems[0]);
    expect(navItem.props()).toMatchObject({
      title: 'title1',
      anchor: 'h-1',
      level: 2,
      index: '1.1.1',
      subItems: [{
        title: 'title2',
        anchor: 'h-2',
        level: 4
      }]
    });
  });

  it('list ', () => {
    const navItem = mount(navItems[1]);
    expect(navItem.props()).toMatchObject({
      title: 'title3',
      anchor: 'h-3',
      level: 2,
      index: '1.1.2',
      subItems: [{
        title: 'title4',
        anchor: 'h-4',
        level: 3
      }]
    });
  });

  it('list ', () => {
    const navItem = mount(navItems[2]);
    expect(navItem.props()).toMatchObject({
      title: 'title5',
      anchor: 'h-5',
      level: 2,
      index: '1.1.3',
      subItems: []
    });
  });

});
