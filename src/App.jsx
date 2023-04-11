import React, {Suspense} from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Footer from './layouts/Footer'
import Header from './layouts/Header'
import Main from './layouts/Main'
import Home from './pages/Home'
import OcrPage from './pages/OcrPage'
import { useSelector } from 'react-redux';
import ScanPage from './pages/ScanPage';
import Snackbar from './potals/SnackBar';
// Lazy loading
const Test = React.lazy(() => import('./pages/Test'));
const Feat = React.lazy(() => import('./pages/Feat'));
const Auth = React.lazy(() => import('./pages/Auth'));
const Register = React.lazy(() => import('./pages/Register'));
const Mypage = React.lazy(() => import('./pages/Mypage'));
const Policy = React.lazy(() => import('./pages/Policy'));
const Term = React.lazy(() => import('./pages/Term'));
// const NotFound = React.lazy(() => import('./pages/NotFound'));
function App() {
  const isSnackBarOpen = useSelector(state => state.ui.snackbar.snackbarIsShow);
  const auth = useSelector(state => state.auth);
  
    return (
      <>
      <Header />
        <Main>
        <Suspense fallback={<LoadingSpinner size="50" width="8" color="success"/>}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/ocr' element={<OcrPage/>}/>
            <Route path='/scan' element={<ScanPage/>}/>
            <Route path='/test' element={<Test />} />
            <Route path='/feat' element={<Feat />} />
            <Route path='/policy' element={<Policy />} />
            <Route path='/term' element={<Term />} />
            <Route path='/register' element={<Register />} />
              {auth.isLogin && <Route path='/mypage/*' element={<Mypage />} />}
              {!auth.isLogin && <Route path='/auth' element={<Auth />} />}
            <Route
              path="*"
              element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
        </Main>
        {isSnackBarOpen && <Snackbar />}
      <Footer />
    </>
  );
}

export default App;