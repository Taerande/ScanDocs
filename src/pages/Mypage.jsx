import { Route, Routes, Navigate } from "react-router-dom"
import Profile from "./Mypage/Profile"
import Mask from "./Mypage/Mask"
// import Dashboard from "./Mypage/Dashboard"


const Mypage = () => {
    return (
        <Routes>
            <Route path="mask" element={<Mask/>} />
            <Route path="profile" element={<Profile/>} />
            <Route
              path="*"
              element={<Navigate replace to="/" />} />
        </Routes>
    )

}
export default Mypage