import React, { PureComponent, Component } from 'react';
import NavItem from '../component/NavItem';

// 避免 subItems 为空数组时因为引用地址不同导致 NavItem 不必要的渲染的问题
import { emptyArray } from '../constants';

const createNavItems = (list, parentLevel, parentIndex) => {
  const navItems = [];
  if (list.length === 1) {
    const item = list[0];
    return (<NavItem
      anchor={item.anchor}
      title={item.title}
      level={parentLevel + 1}
      index={`${parentIndex}.1`}
    />);
  }
  if (list.length === 0) {
    return null;
  }
  let index = 1;
  for (let i = 0; i < list.length; ) {
    const item = list[i];
    const level = item.level;
    let nextIndex = -1;
    for (let j = i + 1; j < list.length; j += 1) {
      if (list[j].level <= level) {
        nextIndex = j;
        break;
      }
    }
    if (nextIndex > 0) {
      const subItems = list.slice(i + 1, nextIndex);
      navItems.push(
        <NavItem
          anchor={item.anchor}
          title={item.title}
          level={parentLevel + 1}
          subItems={subItems.length === 0 ? emptyArray : subItems}
          index={parentIndex ? `${parentIndex}.${index}` : `${index}`}
          key={item.anchor}
          
        />
      );
      i = nextIndex;
    } else {
      const subItems = list.slice(i + 1, list.length);
      navItems.push(
        <NavItem
          anchor={item.anchor}
          title={item.title}
          level={parentLevel + 1}
          subItems={subItems.length === 0 ? emptyArray : subItems}
          index={parentIndex ? `${parentIndex}.${index}` : `${index}`}
          key={item.anchor}
        />
      );
      break;
    }
    index += 1;
  }
  return navItems;
};

export default createNavItems;
