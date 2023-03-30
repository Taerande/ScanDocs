import React, {Suspense, useEffect, useState} from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Footer from './layouts/Footer'
import Header from './layouts/Header'
import Main from './layouts/Main'
import Home from './pages/Home'
import Canvas from './pages/Canvas'
// Lazy loading
const Test = React.lazy(() => import('./pages/Test'));
// const Canvas = React.lazy(() => import('./pages/Canvas'));
// const NotFound = React.lazy(() => import('./pages/NotFound'));
function App() {
    
    return (
      <>
      <Header />
      <Main>
        <Suspense fallback={<LoadingSpinner color="success"/>}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/ocr' element={<Canvas/>}/>
            <Route path='/test' element={<Test />} />
            <Route
              path="*"
              element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </Main>
      <Footer />
    </>
  );
}

export default App;
