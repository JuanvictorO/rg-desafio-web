import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './hooks';
import GlobalRoute from './routes/GlobalRoute';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <GlobalRoute />
    </AppProvider>
    <GlobalStyle />
  </BrowserRouter>
);

export default App;
