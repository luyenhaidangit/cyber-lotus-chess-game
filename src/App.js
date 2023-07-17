// Libraries
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Components
import Layout from './components/Layout';
import Game from './components/Game';

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Game />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
