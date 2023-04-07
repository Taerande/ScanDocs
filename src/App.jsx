import React, {Suspense, useEffect, useState} from 'react';
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Footer from './layouts/Footer'
import Header from './layouts/Header'
import Main from './layouts/Main'
import Home from './pages/Home'
import OcrPage from './pages/OcrPage'
import { useSelector } from 'react-redux';
// Lazy loading
const Test = React.lazy(() => import('./pages/Test'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Howtouse = React.lazy(() => import('./pages/Howtouse'));
const Auth = React.lazy(() => import('./pages/Auth'));
const Register = React.lazy(() => import('./pages/Register'));
const Mypage = React.lazy(() => import('./pages/Mypage'));
// const NotFound = React.lazy(() => import('./pages/NotFound'));
function App() {
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      
    }
  }, [navigate]);
  
    
    return (
      <>
      <Header />
      <Main>
        <Suspense fallback={<LoadingSpinner size="50" width="8" color="success"/>}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/ocr' element={<OcrPage/>}/>
            <Route path='/test' element={<Test />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/howtouse' element={<Howtouse />} />
            <Route path='/register' element={<Register />} />
              {auth.isLogin && <Route path='/mypage/*' element={<Mypage />} />}
              {!auth.isLogin && <Route path='/auth' element={<Auth />} />}
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