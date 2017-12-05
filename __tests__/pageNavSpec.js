
import React from 'react';
import { findDOMNode } from 'react-dom'
import { mount } from 'enzyme';
import { PageNav, PageContent, PageProvider, NavItem } from '../src';

describe('PageNav test with auto', () => {
  const wrapper = mount(
    <PageProvider>
      <PageNav />
      <PageContent>
        <h2 id="h2-2">二级标题</h2>
      </PageContent>
    </PageProvider>
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

