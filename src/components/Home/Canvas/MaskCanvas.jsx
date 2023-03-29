import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react"
import styles from './MaskCanvas.module.css'
import neswSvg from '../../../assets/svgs/resize-nesw.svg'
import nwseSvg from '../../../assets/svgs/resize-nwse.svg'
import { perspectiveTransform } from "../../../functions/transform"

let resizeNESW = new Image();
let resizeNWSE = new Image();
resizeNESW.src = neswSvg;
resizeNWSE.src = nwseSvg;

const MaskCanvas = forwardRef((props, ref) => {
    const canvasRef = useRef(null);
    const uploadedImage = document.getElementById('uploaded-image');
    const [mode, setMode] = useState('');
    const [maskPointIndex, setMaskPointIndex] = useState(-1);
    const [offsetData, setOffsetData] = useState([
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ]);
    const [maskPoints, setMaskPoints] = useState([
        [50, 50],
        [150, 50],
        [150, 130],
        [50, 130]
    ]);
    const draw = (ctx) => {
        // initailize background
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.save();

        // set background cover as grayscale
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);


        // const dests = [...destPoints];
        
        // make quadrilateral inner transparent with dasehed red 5px width
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 5;
        ctx.setLineDash([5]);
        ctx.beginPath();
        maskPoints.forEach((el, idx) => {
            if (idx === 0) {
                ctx.moveTo(el[0], el[1]);
            }
            ctx.lineTo(el[0], el[1]);
        })
        ctx.closePath();
        ctx.stroke();
        ctx.clip();
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.restore();
        maskPoints.forEach((el, idx) => {
            if (idx % 2 == 0) {
                ctx.drawImage(resizeNESW, el[0] - 8, el[1] - 8, 16, 16);
            } else {
                ctx.drawImage(resizeNWSE, el[0] - 8, el[1] - 8, 16, 16);
            }
        })
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
    useEffect(() => {
        setCanvasSize();
    }, []);

    // 영역 확인 후 모드 설정
    const mouseDownHandler = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        if (maskPointIndex == 4) {
            // 상대위치 저장
            const relativeOffsets = maskPoints.map((v) => {
                return [v[0] - offsetX, v[1] - offsetY];
            })
            setOffsetData(relativeOffsets)
            setMode('move');
            return
        }
        if (maskPointIndex > -1) return setMode('resize');
    }
    // 모드 초기화
    const mouseUpHandler = () => {
        setMode('');
    }
    // 모드 설정
    const mouseMoveHandler = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        // 이동, 리사이징, 감지
        switch (mode) {
            // mode가 move일때 움직임
            case 'move':
                maskPoints.forEach((el, idx) => {
                    el[0] = offsetX + offsetData[idx][0];
                    el[1] = offsetY + offsetData[idx][1];
                })
                break;
            case 'resize':
                if (maskPointIndex > 3) return
                maskPoints[maskPointIndex] = [offsetX, offsetY];
                break;
            default:

                // 삼각형 넓이의 합을 통한 x,y위치 확인
        
                // 신발끈 공식으로 넓이 구하기
                function area(x1, y1, x2, y2, x3, y3) {
                    return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
                }
        
                function isInside(points, x, y) {
                    const A = area(points[0][0], points[0][1], points[1][0], points[1][1], points[2][0], points[2][1]);
                    const A1 = area(x, y, points[0][0], points[0][1], points[1][0], points[1][1]);
                    const A2 = area(x, y, points[1][0], points[1][1], points[2][0], points[2][1]);
                    const A3 = area(x, y, points[2][0], points[2][1], points[0][0], points[0][1]);
                    return (A == A1 + A2 + A3);
                }
        
                if (!isInside([maskPoints[0], maskPoints[1], maskPoints[2]], offsetX, offsetY) && !isInside([maskPoints[2], maskPoints[3], maskPoints[0]], offsetX, offsetY)) {
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
                    return
                } else {
                    mask.style.cursor = 'move';
                    setMaskPointIndex(4);
                    return
                    
                }
            }
    }

    const transformImage = () => {
        perspectiveTransform('main', maskPoints);
        setCanvasSize()
    }
    useImperativeHandle(ref, () => ({
        transformImage,
    }));
    
    return (
        <>
            <canvas
                className={styles.mask}
                onMouseDown={mouseDownHandler}
                onMouseUp={mouseUpHandler}
                onMouseMove={mouseMoveHandler}
                // onTouchStart={mouseDownHandler}
                // onTouchEnd={mouseUpHandler}
                // onTouchMove={mouseMoveHandler}
                ref={canvasRef} id="mask">
            </canvas>
        </>
    )
    
});

export default MaskCanvas