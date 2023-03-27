import { useEffect, useRef, useState } from 'react'
import styles from './Canvas.module.css'
import ControlPanel from './ControlPanel'
import closeSvg from '../../assets/svgs/close-circle.svg'
import stretchSvg from '../../assets/svgs/stretch-arrow.svg'
import Tesseract from 'tesseract.js';
import { binaryTransform, perspectiveTransform } from '../../functions/transform'
const colorSet = [
  "#1f77b4", // Blue
  "#ff7f0e", // Orange
  "#2ca02c", // Green
  "#d62728", // Red
  "#9467bd", // Purple
  "#8c564b", // Brown
  "#e377c2", // Pink
  "#bcbd22", // Yellow
  "#17becf", // Teal
  "#ff33cc"  // Magenta
];

const cv = window.cv;
const Canvas = ({ changeImg }) => {
    return (
        <>
            <div>Panel</div>
            <div>
                Cavnas Area
            </div>
            <div>
                Cropped
            </div>
        </>
    )
   

}
export default Canvas