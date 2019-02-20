import React from 'react';
import { Markdown } from 'markdownloader';

const Content = () => {
  return (
    <div>
    <Markdown>
      { require('../md/doc.md') }
    </Markdown>
    <br />
    <Markdown>
      {require('../md/demo.md')}
    </Markdown>
  </div>
  );
}

export default Content;