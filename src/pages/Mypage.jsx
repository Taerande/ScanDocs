import { Route, Routes } from "react-router-dom"
import Profile from "./Mypage/Profile"
import Mask from "./Mypage/Mask"
import Dashboard from "./Mypage/Dashboard"


const Mypage = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="mask" element={<Mask/>} />
            <Route path="profile" element={<Profile/>} />
        </Routes>
    )

}
export default Mypage