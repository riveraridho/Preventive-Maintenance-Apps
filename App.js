/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import ScreenNavigation from './src/navigations/ScreenNavigation';

import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <ScreenNavigation />
    </Provider>
  );
};

export default App;
