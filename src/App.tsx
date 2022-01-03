import React from "react";

import { css } from "@linaria/core";

const className = css`
  color: red;
`;

const App = () => {
  return (
    <div className={className}>
      <h1>
        React 17 and TypeScript 4 App!
      </h1>
    </div>
  );
};

export default App;


