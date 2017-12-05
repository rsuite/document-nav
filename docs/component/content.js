import React from 'react';
import { Markdown } from 'markdownloader';

const Content = () => {
  return (
    <div>
    <Markdown>
      { require('../../README.md') }
    </Markdown>
    <br />
    <div>👈 左边那个就是</div>
    <Markdown>
      {require('../md/course.md')}
    </Markdown>
    <Markdown>
      { require('../md/props.md') }
    </Markdown>

    
    { NODE_ENV === 'development' && 
    <Markdown>
      { require('../md/demo.md') }
    </Markdown>
    }
  </div>
  );
}

export default Content;