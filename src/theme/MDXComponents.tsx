import React from 'react';
import OriginalComponents from '@theme-original/MDXComponents';

export default {
  ...OriginalComponents,

  // wrapper autour de TOUT le contenu MDX
  wrapper: ({ children }) => (
    <div className="custom-mdx-wrapper">
      <div className="injected-header">🚀 Contenu injecté avant la note</div>

      {children}

      <div className="injected-footer">📌 Contenu injecté après la note</div>
    </div>
  ),
};