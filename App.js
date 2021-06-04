import React from 'react';

import { Provider } from 'react-redux';
import { store } from './app/redux/store';

import Wrapper from './app/screens/Wrapper';

const App = () => {
  return (
    <Provider store={store}>
      <Wrapper />
    </Provider>
  );
};

export default App;
