import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import firebase from "@/firebase/firebase";
import store from "./store/index";
import { authActions } from "./store/auth-slice";
import LoadingSpinner from "./components/ui/LoadingSpinner";

const Root = () => {
  const [isAuthReady, setIsAuthReady] = useState(false);
  useEffect(() => {
    // 인증 정보가 변경될 때마다 실행됩니다.
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch(authActions.setAuth({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName ? user.displayName : 'Anonymous'
        })); // authSlice의 setAuth로 user 정보 업데이트
      } else {
        store.dispatch(setAuth({
          uid: null,
          email: null,
          displayName: null
        })); // 로그아웃시 null로 초기화
      }
      setIsAuthReady(true);
    })
    // 컴포넌트가 unmount되기 전에 구독을 해제합니다.
    return unsubscribe;
  }, []);
  if (!isAuthReady) {
    return (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <LoadingSpinner width="8" size="50" color="success" />
      </div>
    )
  } else {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
  }

};

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<Root />);