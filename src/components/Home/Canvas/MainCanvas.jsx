import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import styles from './MainCanvas.module.css'
import closeSvg from '../../../assets/svgs/close-circle.svg'
import stretchSvg from '../../../assets/svgs/stretch-arrow.svg'
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

let closeBtn = new Image();
let stretchBtn = new Image();
closeBtn.src = closeSvg;
stretchBtn.src = stretchSvg;

const MainCanvas = forwardRef((props, ref) => {
    const uploadedImage = document.getElementById('uploaded-image');
    const canvasRef = useRef(null);
    
    const [rectangles, setRectangles] = useState([]);
    const [mode, setMode] = useState('');

    const [draggingIndex, setDraggingIndex] = useState(-1);
    const [resizingIndex, setResizingIndex] = useState(-1);
    const [deleteIndex, setDeleteIndex] = useState(-1);

    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);

    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.lineWidth = 3;
        let croppedImg;
        let crpCtx;
        let croppedCanvas;
        ctx.drawImage(uploadedImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
        //   Cropped Image 그리기
        rectangles.forEach(({ x, y, w, h, id }) => {
            croppedCanvas = document.getElementById(`canvas${id}`);
            if (croppedCanvas) {
                croppedImg = ctx.getImageData(x, y, w, h);
                crpCtx = croppedCanvas.getContext('2d');
                crpCtx.clearRect(0, 0, croppedCanvas.width, croppedCanvas.height);
                croppedCanvas.width = w;
                croppedCanvas.height = h;
                crpCtx.putImageData(croppedImg, 0, 0);
            }
        });
        //   Rect 그리기
        rectangles.forEach(({ x, y, w, h, color }) => {
            ctx.strokeStyle = color;
            ctx.strokeRect(x, y, w, h);
            ctx.drawImage(closeBtn, x + w - radiusBtn, y - radiusBtn, diameterBtn, diameterBtn);
            ctx.drawImage(stretchBtn, x + w - radiusBtn, y + h - radiusBtn, diameterBtn, diameterBtn);
        });
     
      
    };
    const setCanvasSize = () => {
        if (uploadedImage.width > innerWidth) {
            canvasRef.current.width = innerWidth * 0.9;
            canvasRef.current.height = innerWidth * 0.9 * uploadedImage.height / uploadedImage.width;
        } else {
            canvasRef.current.width = uploadedImage.width;
            canvasRef.current.height = uploadedImage.height;
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        // set canvas size
        
        const context = canvas.getContext('2d');
        let animationFrameId;

        const render = () => {
            draw(context);
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        addEventListener('resize', setCanvasSize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            removeEventListener('resize', setCanvasSize);
        };
    }, [draw]);


    // 첫 canvas size 결정
    useEffect(() => {
        setCanvasSize();
    }, [])


    // 모드 설정
    const mouseMoveHandler = (e) => {
        
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        
        let diffX;
        let diffY;
        const updatedRects = [...rectangles];
        // 이동, 리사이징, 감지
        switch (mode) {
            // mode가 move일때 움직임
            case 'move':
                if (!updatedRects[draggingIndex]) return
                updatedRects[draggingIndex].x = offsetX - dx;
                updatedRects[draggingIndex].y = offsetY - dy;
                break;
            // mode reisze일때 rect변경
            case 'resize':
                if (!updatedRects[resizingIndex]) return
                let dw = offsetX - updatedRects[resizingIndex].x;
                let dh = offsetY - updatedRects[resizingIndex].y;
                if (dw < 15 || dh < 15) return
                updatedRects[resizingIndex].w = dw;
                updatedRects[resizingIndex].h = dh;
                break;
            default:
                // defalut 모드로서 현재 영역에 대한 감지
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
    }
    // 영역 확인 후 모드 설정
    const mouseDownHandler = (e) => {
        if (draggingIndex > -1) {
            const rect = canvasRef.current.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            setDx(offsetX - rectangles[draggingIndex].x);
            setDy(offsetY - rectangles[draggingIndex].y);
            setMode('move');
        }
        if (deleteIndex > -1) {
            const updatedRects = [...rectangles];
            updatedRects.splice(deleteIndex, 1);
            setRectangles([...updatedRects]);
            canvasRef.current.style.cursor = null;
        }
        if (resizingIndex > -1) {
            setMode('resize');
        }
    }
    // 초기화
    const mouseUpHandler = () => {
        setMode('check');

    }
    const createRectHandler = () => {
        setRectangles([{
            id: rectangles.length,
            color: colorSet[rectangles.length % 10],
            x: 50,
            y: 50,
            w: 100,
            h: 80,
        }, ...rectangles]);
    }
    const clearRectHandler = () => {
        setRectangles([]);
    }

     useImperativeHandle(ref, () => ({
        createRectHandler,
        clearRectHandler

    }));
    return (
        <>
            <canvas
                className={styles['main-canvas']}
                onMouseDown={mouseDownHandler}
                onMouseUp={mouseUpHandler}
                onMouseMove={mouseMoveHandler}
                // onTouchStart={mouseDownHandler}
                // onTouchEnd={mouseUpHandler}
                // onTouchMove={mouseMoveHandler}
                ref={canvasRef} id="main"></canvas>
            <div className={styles['cropped-container']}>
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
        </>
    )

});
export default MainCanvas