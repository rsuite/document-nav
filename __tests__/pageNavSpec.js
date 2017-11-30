
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import PageNav from '../src';

describe('PageNav test with default props', () => {
  const wrapper = mount(<PageNav content={<h2 id="h2-2">二级标题</h2>} />);

  it('id should be covered', () => {
    expect(wrapper.find('#h2-2').exists()).toEqual(false);
  });
});

describe('PageNav test with custom props', () => {
  const wrapper = mount(
    <PageNav
      content={<h2 id="h2-2">二级标题</h2>}
      coverId={false}
    />);

  it('id should not be covered', () => {
    expect(wrapper.find('#h2-2').exists()).toEqual(true);
  });

});

