// @flow
import * as React from 'react';
import classnames from 'classnames';

type Props = {
  children: React.Node
};

const Content = ({ children, className, ...props }) => (
  <div {...props} className={classnames('rs-document-nav-content', className)}>
    {children}
  </div>
);

export default Content;
