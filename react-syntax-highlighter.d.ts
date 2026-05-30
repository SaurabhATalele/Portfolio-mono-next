// Declarations for react-syntax-highlighter and its style import
declare module 'react-syntax-highlighter' {
  import * as React from 'react';
  export const Prism: React.ComponentType<any>;
  export const Light: React.ComponentType<any>;
  export default Prism;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  const style: any;
  export default style;
}
