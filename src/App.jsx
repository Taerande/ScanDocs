import React, {Suspense, useEffect, useState} from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import LoadingSpinner from './components/ui/LoadingSpinner';
import styles from './App.module.css'

import Footer from './layouts/Footer'
import Header from './layouts/Header'
import Main from './layouts/Main'
import Home from './pages/Home';
// Lazy loading
const Test = React.lazy(() => import('./pages/Test'));
// const NotFound = React.lazy(() => import('./pages/NotFound'));
function App() {
    const [opencvLoaded, setOpencvLaoded] = useState(false);
    useEffect(() => {
        console.log('effec');
        if (document.querySelector('script[src="https://docs.opencv.org/4.5.5/opencv.js"]')) {
            return;
        }
        console.log('call');
        const script = document.createElement('script');
        script.src = "https://docs.opencv.org/4.5.5/opencv.js";
        script.async = true;
        document.body.appendChild(script);
        setOpencvLaoded(true);
  },[])
    return (
      <>
            {!opencvLoaded && <div className={styles['opencv-loader-backdrop']}>
                <div className={ styles['opencv-loader-content']}>
                    <LoadingSpinner color="success" size="36" width="4" />
                    <div>Loading openCV... You must online.</div>
                </div>
          </div>}
      <Header />
      <Main>
        <Suspense fallback={<LoadingSpinner color="success"/>}>
          <Routes>
            <Route path='/' element={<Home/>}/>
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
