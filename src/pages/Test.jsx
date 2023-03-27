import { useEffect, useRef, useState } from "react"
import MainCanvas from "../components/Home/Canvas/MainCanvas"
import MaskCanvas from "../components/Home/Canvas/MaskCanvas"

const Test = () => {
    return (
        <div>
            <img id="target" src="./invoice.png" style={{ display: 'none' }} alt="" />
            <MainCanvas/>
            <MaskCanvas/>

        </div>
    )

}
export default Test