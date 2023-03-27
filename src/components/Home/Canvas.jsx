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

const diameterBtn = 25;
const radiusBtn = diameterBtn / 2;
const cv = window.cv;
const Canvas = ({ changeImg }) => {
    const canvasRef = useRef(null);
    const maskRef = useRef(null);
    const [maskPoints, setMaskPoints] = useState([[50,50],[170, 50],[170, 110], [50,110]]);
    const [maskPointIndex, setMaskPointIndex] = useState(-1);
    const [maskOpen, setMaskOpen] = useState(false);
    const [rectangles, setRectangles] = useState([]);
    const [mode, setMode] = useState('check');
    const [draggingIndex, setDraggingIndex] = useState(-1);
    const [resizingIndex, setResizingIndex] = useState(-1);
    const [deleteIndex, setDeleteIndex] = useState(-1);
    const [maskStatus, setMaskStatus] = useState('check');
    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);

    // 초기값 세팅 및 rect 추가시 drawing
    useEffect(() => {
        const canvas = canvasRef.current;
        const mask = maskRef.current;
        const ctx = canvas.getContext("2d",{ willReadFrequently: true });
        const maskCtx = mask.getContext("2d",{ willReadFrequently: true });
        const bd = document.getElementById('canvas-backdrop');
        let imgCon = document.getElementById('uploaded-image');
        let imgRatio = (imgCon.height / imgCon.width);

        

        if (imgCon.width > innerWidth) {
            canvas.width = innerWidth * 0.9; 
            canvas.height = innerWidth * 0.9 * imgCon.height/imgCon.width; 
        } else {
            canvas.width = imgCon.width; 
            canvas.height =  imgCon.height; 
        }
        mask.width = canvas.width; 
        mask.height =  canvas.height; 
        
        ctx.lineWidth = 3;
        ctx.font = "16px Verdana";
        // Draw all the rectangles
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgCon, 0, 0, canvas.width, canvas.height);
        let closeBtn = new Image();
        let stretchBtn = new Image();
        closeBtn.src = closeSvg;
        stretchBtn.src = stretchSvg;
        let rect;
        let cv;
        let cvCtx;
        let j;
        rectangles.forEach(({ x, y, w, h, color, id }) => {
            cv = document.getElementById(`canvas${id}`);
            cvCtx = cv.getContext('2d',{ willReadFrequently: true });
            cvCtx.clearRect(0, 0, cvCtx.width, cvCtx.height);
            rect = ctx.getImageData(x, y, w, h);
            ctx.strokeStyle = color;
            ctx.strokeRect(x, y, w, h);
            ctx.drawImage(closeBtn, x + w - radiusBtn, y-radiusBtn, diameterBtn, diameterBtn);
            ctx.drawImage(stretchBtn, x + w - radiusBtn, y + h - radiusBtn, diameterBtn, diameterBtn);
            ctx.fillText(`${id}`, x+5, y+20);
            cvCtx.putImageData(rect, 0, 0);
        });


        // Canvas EventHandler Callback
        function handleMouseMove(e) {
            const { offsetX, offsetY } = e;
            const target = e.target.id;
            let diffX;
            let diffY;
            const updatedRects = [...rectangles];
            const updatedPoints = [...maskPoints];
            switch (target) {
                case 'canvas':
                    switch (mode) {
                        case 'move':
                            if (!updatedRects[draggingIndex]) return
                            updatedRects[draggingIndex].x = offsetX - dx;
                            updatedRects[draggingIndex].y = offsetY - dy;
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(imgCon, 0, 0, canvas.width, canvas.height);
                            updatedRects.forEach(({ x, y, w, h, color, id }) => {
                                cv = document.getElementById(`canvas${id}`);
                                cvCtx = cv.getContext('2d', { willReadFrequently: true });
                                cvCtx.clearRect(0, 0, cvCtx.width, cvCtx.height);
                                rect = ctx.getImageData(x, y, w, h);
                                ctx.strokeStyle = color;
                                ctx.strokeRect(x, y, w, h);
                                ctx.drawImage(closeBtn, x + w - radiusBtn, y - radiusBtn, diameterBtn, diameterBtn);
                                ctx.drawImage(stretchBtn, x + w - radiusBtn, y + h - radiusBtn, diameterBtn, diameterBtn);
                                ctx.fillText(`${id}`, x + 5, y + 20);
                                cvCtx.putImageData(rect, 0, 0);
                            });
                            break;
                        case 'resize':
                            if (!updatedRects[resizingIndex]) return
                            let dw = offsetX - updatedRects[resizingIndex].x;
                            let dh = offsetY - updatedRects[resizingIndex].y;
                            if (dw < 15 || dh < 15) return
                            updatedRects[resizingIndex].w = dw;
                            updatedRects[resizingIndex].h = dh;
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(imgCon, 0, 0, canvas.width, canvas.height);
                            updatedRects.forEach(({ x, y, w, h, color, id }) => {
                                cv = document.getElementById(`canvas${id}`);
                                cvCtx = cv.getContext('2d', { willReadFrequently: true });
                                cvCtx.clearRect(0, 0, cvCtx.width, cvCtx.height);
                                rect = ctx.getImageData(x, y, w, h);
                                ctx.strokeStyle = color;
                                ctx.strokeRect(x, y, w, h);
                                ctx.drawImage(closeBtn, x + w - radiusBtn, y - radiusBtn, diameterBtn, diameterBtn);
                                ctx.drawImage(stretchBtn, x + w - radiusBtn, y + h - radiusBtn, diameterBtn, diameterBtn);
                                ctx.fillText(`${id}`, x + 5, y + 20);
                                cvCtx.putImageData(rect, 0, 0);
                            });
                            break;
                        // Delete Mode 는 rect state 와 useEffect dependacy로 삭제
                        
                        // Move, Stretch, Delete check and cursor change
                        default:
                            for (let i = 0; i < rectangles.length; i++) {
                                diffX = offsetX - rectangles[i].x;
                                diffY = offsetY - rectangles[i].y;
                                // Move
                                if (diffX > 0 && diffX < rectangles[i].w - radiusBtn && diffY > 0 && diffY < rectangles[i].h) {
                                    canvas.style.cursor = 'move';
                                    setDeleteIndex(-1);
                                    setResizingIndex(-1);
                                    setDraggingIndex(i);
                                    break;
                                    // Delete
                                } else if (diffX - rectangles[i].w + radiusBtn > 0 && diffX < rectangles[i].w + radiusBtn && diffY > -15 && diffY < 15) {
                                    canvas.style.cursor = 'pointer';
                                    setResizingIndex(-1);
                                    setDraggingIndex(-1);
                                    setDeleteIndex(i);
                                    break;
                                    // Resize
                                } else if (diffX - rectangles[i].w + radiusBtn > 0 && diffX < rectangles[i].w + radiusBtn && diffY - rectangles[i].h + radiusBtn > 0 && diffY < rectangles[i].h + radiusBtn) {
                                    canvas.style.cursor = 'nwse-resize';
                                    setDeleteIndex(-1);
                                    setDraggingIndex(-1);
                                    setResizingIndex(i);
                                    break;
                                    // Outside
                                } else {
                                    canvas.style.cursor = null;
                                    setDeleteIndex(-1);
                                    setResizingIndex(-1);
                                    setDraggingIndex(-1);
                                }
                            }
                            break;
                    }
                    break;
                case 'mask':
                    switch (mode) {
                        case 'move':
                            // updatedPoints[maskPointIndex] = [offsetX, offsetY];
                            // maskCtx.lineWidth = 2;
                            // maskCtx.fillStyle = '#2ecc71';
                            // maskCtx.clearRect(0, 0, mask.width, mask.height);
                            // for (let i = 0; i < updatedPoints.length; i++){
                            //     if (i == 3) {
                            //         j = 0;
                            //     } else {
                            //         j = i + 1;
                            //     }
                            //     maskCtx.beginPath();
                            //     maskCtx.moveTo(updatedPoints[i][0], updatedPoints[i][1]);
                            //     maskCtx.lineTo(updatedPoints[j][0], updatedPoints[j][1]);
                            //     maskCtx.stroke();
                            // }
                            // for (let i = 0; i < updatedPoints.length; i++){
                            //     maskCtx.fillRect(updatedPoints[i][0]-8, updatedPoints[i][1]-8, 16, 16);
                            // }
                            break;
                        case 'resize':
                            updatedPoints[maskPointIndex] = [offsetX, offsetY];
                            maskCtx.lineWidth = 2;
                            maskCtx.fillStyle = '#2ecc71';
                            maskCtx.clearRect(0, 0, mask.width, mask.height);
                            for (let i = 0; i < updatedPoints.length; i++){
                                if (i == 3) {
                                    j = 0;
                                } else {
                                    j = i + 1;
                                }
                                maskCtx.beginPath();
                                maskCtx.moveTo(updatedPoints[i][0], updatedPoints[i][1]);
                                maskCtx.lineTo(updatedPoints[j][0], updatedPoints[j][1]);
                                maskCtx.stroke();
                                maskCtx.closePath();
                            }
                            for (let i = 0; i < updatedPoints.length; i++){
                                maskCtx.fillRect(updatedPoints[i][0]-8, updatedPoints[i][1]-8, 16, 16);
                            }
                            break;
                        default:
                            for (let i = 0; i < maskPoints.length; i++){
                                maskCtx.clearRect(0, 0, mask.width, mask.height);
                                maskCtx.lineWidth = 2;
                                maskCtx.fillStyle = '#2ecc71';
                                let k = 0;
                                if (i == 3) {
                                    k = 0;
                                } else {
                                    k = i + 1;
                                }
                                maskCtx.beginPath();
                                maskCtx.moveTo(maskPoints[i][0], maskPoints[i][1]);
                                maskCtx.lineTo(maskPoints[k][0], maskPoints[k][1]);
                                maskCtx.stroke();
                                maskCtx.closePath();
                            }
                            for (let i = 0; i < maskPoints.length; i++){
                                maskCtx.fillRect(maskPoints[i][0]-8, maskPoints[i][1]-8, 16, 16);
                            }

                            // 삼각형 넓이의 합을 통한 x,y위치 확인

                            // 신발끈 공식으로 넓이 구하기
                            function area(x1, y1, x2, y2, x3, y3) {
                                return Math.abs((x1*(y2-y3) + x2*(y3-y1)+ x3*(y1-y2))/2.0);
                            }

                            function isInside(points, x, y) {
                                const A = area(points[0][0], points[0][1], points[1][0], points[1][1], points[2][0], points[2][1]);
                                const A1 = area(x, y, points[0][0], points[0][1], points[1][0], points[1][1]);
                                const A2 = area(x, y, points[1][0], points[1][1], points[2][0], points[2][1]);
                                const A3 = area(x, y, points[2][0], points[2][1], points[0][0], points[0][1]);
                                return (A == A1 + A2 + A3);
                            }

                            if (isInside([maskPoints[0], maskPoints[1], maskPoints[2]], offsetX, offsetY) || isInside([maskPoints[2], maskPoints[3], maskPoints[0]], offsetX, offsetY)) {
                                mask.style.cursor = 'move';
                                setMaskPointIndex(null);
                                return
                            } else {
                                mask.style.cursor = null;
                                let maskIdx = -1;
                                maskPoints.forEach((el, idx) => {
                                    if (Math.abs(offsetX - el[0]) < 16 && Math.abs(offsetY - el[1]) < 16) {
                                        maskIdx = idx;
                                    } 
                                })
                                if (maskIdx % 2 == 0) {
                                    mask.style.cursor = 'nwse-resize';
                                } else if (maskIdx % 2 == 1) {
                                    mask.style.cursor = 'nesw-resize';
                                }
                                setMaskPointIndex(maskIdx);
                                
                            }
                        break;
                        // Delete Mode 는 rect state 와 useEffect dependacy로 삭제
                        
                        // Move, Stretch, Delete check and cursor change
                    }
                    break;
            }
        }
        // mode
        // 1. move, 2.stretch, 3. delete
        function handleDragStart(e) {
            const target = e.target.id;
            switch (target) {
                case 'mask':
                    if(!maskPointIndex) return setMode('move')
                    if (maskPointIndex > -1) {
                        setMode('resize')
                    } else {
                        setMode('check')
                        
                    }

                    break;
                case 'canvas':
                    if (draggingIndex > -1) {
                        setDx(e.offsetX - rectangles[draggingIndex].x);
                        setDy(e.offsetY - rectangles[draggingIndex].y);
                        setMode('move');
                    }
                    if (deleteIndex > -1) {
                        const updatedRects = [...rectangles];
                        updatedRects.splice(deleteIndex, 1);
                        setRectangles([...updatedRects]);
                        canvas.style.cursor = null;
                    }
                    if (resizingIndex > -1) {
                        setMode('resize');
                    }
                    break;
                
            }
        }
        function handleDragEnd(e) {
            const target = e.target.id;
            switch (target) {
                case 'canvas':
                    setMode('check');
                    break;
                case 'mask':
                    setMode('check');
                break;
            }
        }
        // const canvasClickHandler = (e) => {
        //     if (e.target.id !== 'mask') return 
        //     if(maskPoints.length > 4) return
        //     maskCtx.beginPath();
        //     maskCtx.arc(e.offsetX, e.offsetY, 5, 0, Math.PI * 2, true);
        //     maskCtx.closePath();
        //     maskCtx.fill();
        //     console.log(e.offsetX, e.offsetY);
        //     setMaskPoints(oldArray => [...oldArray,[e.offsetX, e.offsetY]] );
        //     // setMaskPoints([...maskPoints, [e.offsetX, e.offsetY]]);
        // }


        // 이벤트 위임
        const canvasCon = document.getElementById('canvas-container');
        canvasCon.addEventListener('mousemove', handleMouseMove);
        canvasCon.addEventListener('touchmove', handleMouseMove);
        canvasCon.addEventListener('mousedown', handleDragStart);
        canvasCon.addEventListener('touchstart', handleDragStart);
        canvasCon.addEventListener('mouseup', handleDragEnd);
        canvasCon.addEventListener('touchend', handleDragEnd);
        return () => {
            canvasCon.removeEventListener('mousemove', handleMouseMove);
            canvasCon.removeEventListener('touchmove', handleMouseMove);
            canvasCon.removeEventListener('mousedown', handleDragStart);
            canvasCon.removeEventListener('mouseup', handleDragEnd);
            canvasCon.removeEventListener('touchstart', handleDragStart);
            canvasCon.removeEventListener('touchend', handleDragEnd);
            // canvasCon.addEventListener('click', clickHandler);
        }
    }, [rectangles, draggingIndex, resizingIndex, deleteIndex, maskPointIndex, mode]);

  
    const addNewRectHandler = () => {
        setRectangles([{
            id: rectangles.length,
            color: colorSet[rectangles.length % 10],
            x: 100,
            y: 100,
            w: 100,
            h: 50
        },...rectangles]);
    }
    const clearAllRectHandler = () => {
        setRectangles([]);
    }
    const ocrImgHandler = (id) => {
        const canvas = document.getElementById(`canvas${id}`);

        binaryTransform(`canvas${id}`, `canvas${id}`);

        Tesseract.recognize(canvas, 'kor', { logger: m => console.log(m) })
        .then(({ data: { text } }) => {
            console.log(text);
        })
    }
    const transHandler = (id) => {
        const canvas = document.getElementById(`canvas${id}`);

        binaryTransform(`canvas${id}`, `canvas${id}`);

    }
    const addNewMask = () => {
        setMaskOpen(!maskOpen);
        if (maskOpen) return
        let mask;
        mask = maskRef.current;
        const ctx = mask.getContext('2d');
        ctx.clearRect(0, 0, mask.width, mask.height);
        ctx.lineWidth = 2;
        ctx.fillStyle = '#2ecc71';
        let j;
        for (let i = 0; i < maskPoints.length; i++){
            if (i == 3) {
                j = 0;
            } else {
                j = i + 1;
            }
            ctx.beginPath();
            ctx.moveTo(maskPoints[i][0], maskPoints[i][1]);
            ctx.lineTo(maskPoints[j][0], maskPoints[j][1]);
            ctx.stroke();
        }
        for (let i = 0; i < maskPoints.length; i++){
            ctx.fillRect(maskPoints[i][0]-8, maskPoints[i][1]-8, 16, 16);
        }
        // ctx.styleStroke = '#fffff'
        // ctx.strokeRect(maskPoints[0][0], maskPoints[0][1], maskPoints[1][0] - maskPoints[0][0], maskPoints[3][1]-maskPoints[0][1]);
        // 꼭지점을 움직일 수 있는 사각형 만들고 각 꼭짓점을 maskPoints state로 지정한다.


        // ctx.

    };
    const perHandler = () => {
        setMaskOpen(false);
        perspectiveTransform('canvas', 'canvas', maskPoints);
    }
    return <div className={styles.container}>
        <div>
            Information
        </div>
        <div>drag idx: {draggingIndex}   resize idx : {resizingIndex}   delete idx : { deleteIndex}</div>
        <div>mode:{mode}</div>
        <ControlPanel addNewMask={addNewMask} changeImg={changeImg} addNewRect={addNewRectHandler} clearRect={clearAllRectHandler} />
        <button onClick={perHandler}>sad</button>
        <div>
            {JSON.stringify(maskPoints)}
        </div>
        <div>
            {`mask Idx : ${maskPointIndex}, mode: ${mode}`}
        </div>
        <div id="canvas-backdrop" className={styles.backdrop}></div>
        <div className={styles['canvas-container']} id="canvas-container">
            <canvas ref={canvasRef} id="canvas" className={styles.canvas}>
                캔버스를 지원하지 않는 브라우저 환경입니다.</canvas>
            <canvas ref={maskRef} id="mask" className={styles.mask} style={{display:!maskOpen ? 'none' : ''}}>
                캔버스를 지원하지 않는 브라우저 환경입니다.</canvas>
        </div>
        <div className={styles['cropped-container'] }>
            {rectangles.map((v, idx) => {
                return (
                    <div key={idx} style={{ border: `2px ${v.color} dashed` }} className={styles['cropped-container']}>
                        <div className={styles.cropped}>
                            <canvas width={v.w} height={v.h} id={`canvas${v.id}`}>캔버스를 지원하지 않는 브라우저 환경입니다.</canvas>
                        </div>
                        <button onClick={() => ocrImgHandler(v.id)}> Tesseract </button>
                        <button onClick={() => transHandler(v.id)}> hi </button>
                    </div>
                )
            })}
        </div>
    </div>

}
export default Canvas