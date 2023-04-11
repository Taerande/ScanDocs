import { useEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback } from "react";
import styles from './MainCanvas.module.css'
import closeSvg from '../../../assets/svgs/close-circle.svg'
import stretchSvg from '../../../assets/svgs/stretch-arrow.svg'
import Tesseract from 'tesseract.js';
import { binaryTransform } from "../../../functions/transform";
import ProgressBar from "../../ui/ProgressBar";
import LoadingSpinner from "../../ui/LoadingSpinner";
import MultiSelect from "../../ui/MultiSelect";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
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
const languages = [
    {id:0, value:"afr",	text:"Afrikaans"},
    {id:1, value:"amh",	text:"Amharic"},
    {id:2, value:"ara",	text:"Arabic"},
    {id:3, value:"asm",	text:"Assamese"},
    {id:4, value:"aze",	text:"Azerbaijani"},
    {id:5, value:"aze_cyrl",	text:"Azerbaijani - Cyrillic"},
    {id:6, value:"bel",	text:"Belarusian"},
    {id:7, value:"ben",	text:"Bengali"},
    {id:8, value:"bod",	text:"Tibetan"},
    {id:9, value:"bos",	text:"Bosnian"},
    {id:10, value:"bul",	text:"Bulgarian"},
    {id:11, value:"cat",	text:"Catalan; Valencian"},
    {id:12, value:"ceb",	text:"Cebuano"},
    {id:13, value:"ces",	text:"Czech"},
    {id:14, value:"chi_sim",	text:"Chinese - Simplified"},
    {id:15, value:"chi_tra",	text:"Chinese - Traditional"},
    {id:16, value:"chr",	text:"Cherokee"},
    {id:17, value:"cym",	text:"Welsh"},
    {id:18, value:"dan",	text:"Danish"},
    {id:19, value:"deu",	text:"German"},
    {id:20, value:"dzo",	text:"Dzongkha"},
    {id:21, value:"ell",	text:"Greek, Modern (1453-)"},
    {id:22, value:"eng",	text:"English"},
    {id:23, value:"enm",	text:"English, Middle (1100-1500)"},
    {id:24, value:"epo",	text:"Esperanto"},
    {id:25, value:"est",	text:"Estonian"},
    {id:26, value:"eus",	text:"Basque"},
    {id:27, value:"fas",	text:"Persian"},
    {id:28, value:"fin",	text:"Finnish"},
    {id:29, value:"fra",	text:"French"},
    {id:30, value:"frk",	text:"German Fraktur"},
    {id:31, value:"frm",	text:"French, Middle (ca. 1400-1600)"},
    {id:32, value:"gle",	text:"Irish"},
    {id:33, value:"glg",	text:"Galician"},
    {id:34, value:"grc",	text:"Greek, Ancient (-1453)"},
    {id:35, value:"guj",	text:"Gujarati"},
    {id:36, value:"hat",	text:"Haitian; Haitian Creole"},
    {id:37, value:"heb",	text:"Hebrew"},
    {id:38, value:"hin",	text:"Hindi"},
    {id:39, value:"hrv",	text:"Croatian"},
    {id:40, value:"hun",	text:"Hungarian"},
    {id:41, value:"iku",	text:"Inuktitut"},
    {id:42, value:"ind",	text:"Indonesian"},
    {id:43, value:"isl",	text:"Icelandic"},
    {id:44, value:"ita",	text:"Italian"},
    {id:45, value:"ita_old",	text:"Italian - Old"},
    {id:46, value:"jav",	text:"Javanese"},
    {id:47, value:"jpn",	text:"Japanese"},
    {id:48, value:"kan",	text:"Kannada"},
    {id:49, value:"kat",	text:"Georgian"},
    {id:50, value:"kat_old",	text:"Georgian - Old"},
    {id:51, value:"kaz",	text:"Kazakh"},
    {id:52, value:"khm",	text:"Central Khmer"},
    {id:53, value:"kir",	text:"Kirghiz; Kyrgyz"},
    {id:54, value:"kor",	text:"Korean"},
    {id:55, value:"kur",	text:"Kurdish"},
    {id:56, value:"lao",	text:"Lao"},
    {id:57, value:"lat",	text:"Latin"},
    {id:58, value:"lav",	text:"Latvian"},
    {id:59, value:"lit",	text:"Lithuanian"},
    {id:60, value:"mal",	text:"Malayalam"},
    {id:61, value:"mar",	text:"Marathi"},
    {id:62, value:"mkd",	text:"Macedonian"},
    {id:63, value:"mlt",	text:"Maltese"},
    {id:64, value:"msa",	text:"Malay"},
    {id:65, value:"mya",	text:"Burmese"},
    {id:66, value:"nep",	text:"Nepali"},
    {id:67, value:"nld",	text:"Dutch; Flemish"},
    {id:68, value:"nor",	text:"Norwegian"},
    {id:69, value:"ori",	text:"Oriya"},
    {id:70, value:"pan",	text:"Panjabi; Punjabi"},
    {id:71, value:"pol",	text:"Polish"},
    {id:72, value:"por",	text:"Portuguese"},
    {id:73, value:"pus",	text:"Pushto; Pashto"},
    {id:74, value:"ron",	text:"Romanian; Moldavian; Moldovan"},
    {id:75, value:"rus",	text:"Russian"},
    {id:76, value:"san",	text:"Sanskrit"},
    {id:77, value:"sin",	text:"Sinhala; Sinhalese"},
    {id:78, value:"slk",	text:"Slovak"},
    {id:79, value:"slv",	text:"Slovenian"},
    {id:80, value:"spa",	text:"Spanish; Castilian"},
    {id:81, value:"spa_old",	text:"Spanish; Castilian - Old"},
    {id:82, value:"sqi",	text:"Albanian"},
    {id:83, value:"srp",	text:"Serbian"},
    {id:84, value:"srp_latn",	text:"Serbian - Latin"},
    {id:85, value:"swa",	text:"Swahili"},
    {id:86, value:"swe",	text:"Swedish"},
    {id:87, value:"syr",	text:"Syriac"},
    {id:88, value:"tam",	text:"Tamil"},
    {id:89, value:"tel",	text:"Telugu"},
    {id:90, value:"tgk",	text:"Tajik"},
    {id:91, value:"tgl",	text:"Tagalog"},
    {id:92, value:"tha",	text:"Thai"},
    {id:93, value:"tir",	text:"Tigrinya"},
    {id:94, value:"tur",	text:"Turkish"},
    {id:95, value:"uig",	text:"Uighur; Uyghur"},
    {id:96, value:"ukr",	text:"Ukrainian"},
    {id:97, value:"urd",	text:"Urdu"},
    {id:98, value:"uzb",	text:"Uzbek"},
    {id:99, value:"uzb_cyrl",	text:"Uzbek - Cyrillic"},
    {id:100, value:"vie",	text:"Vietnamese"},
    {id:101, value:"yid",	text:"Yiddish"},
]

const diameterBtn = 25;
const radiusBtn = diameterBtn / 2;

let closeBtn = new Image();
let stretchBtn = new Image();
closeBtn.src = closeSvg;
stretchBtn.src = stretchSvg;


const MainCanvas = forwardRef((props, ref) => {
    const uploadedImage = document.getElementById('uploaded-image');
    const canvasRef = useRef(null);
    const dispatch = useDispatch();
    
    const [rectangles, setRectangles] = useState([]);
    const [mode, setMode] = useState('');

    const [draggingIndex, setDraggingIndex] = useState(-1);
    const [resizingIndex, setResizingIndex] = useState(-1);
    const [deleteIndex, setDeleteIndex] = useState(-1);

    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);

    const draw = useCallback((ctx) => {
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
                crpCtx = croppedCanvas.getContext('2d',{willReadFrequently: true});
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
    })
    const setCanvasSize = useCallback(() => {
        const maxWidth = document.getElementById('canvas-container').clientWidth;
        if (uploadedImage.width > maxWidth) {
            canvasRef.current.width = maxWidth;
            canvasRef.current.height = maxWidth * uploadedImage.height / uploadedImage.width;
        } else {
            canvasRef.current.width = uploadedImage.width;
            canvasRef.current.height = uploadedImage.height;
        }
    })
    
    // 첫 canvas size 결정
    useEffect(() => {
        setCanvasSize();
    }, [canvasRef.current])


    useEffect(() => {
        const canvas = canvasRef.current;
        // set canvas size
        
        const context = canvas.getContext('2d', { willReadFrequently: true });
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

    // 모드 설정
    const mouseMoveHandler = (e) => {
        
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        let xPointer = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
        let yPointer = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY
        const offsetX = xPointer - rect.left;
        const offsetY = yPointer - rect.top;
        
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
        // e.preventDefault();
        if(e.type === 'touchstart') { document.body.style.overflow = 'hidden'}
        let xPointer = e.type === 'touchstart' ? e.targetTouches[0].clientX : e.clientX
        let yPointer = e.type === 'touchstart' ? e.targetTouches[0].clientY : e.clientY
        if (draggingIndex > -1) {
            const rect = canvasRef.current.getBoundingClientRect();
            const offsetX = xPointer - rect.left;
            const offsetY = yPointer - rect.top;
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
    const mouseUpHandler = (e) => {
        e.preventDefault();
        if(e.type === 'touchend') { document.body.style.overflow = null }
        setMode('check');

    }
    const createRectHandler = () => {
        const isProgress = rectangles.find(v => v.loading === true);
        if(isProgress) return
        setRectangles([{
            id: rectangles.length,
            color: colorSet[rectangles.length % 10],
            x: 50,
            y: 50,
            w: 100,
            h: 80,
            loading:false,
            progress: 0,
            statement:'',
            result: '',
            lang:'',
        }, ...rectangles]);
    }
    const clearRectHandler = () => {
        setRectangles([]);
    }

    const ocrImgHandler = useCallback((id, index) => {

        const idxOfRect = rectangles.findIndex(v => v.id === id);
        if (rectangles[idxOfRect].lang === '') {
            dispatch(uiActions.toggleSnackbar({
                value: true,
                type: 'alert',
                message:'You must select at least one language.'
            }))
            return;
        }

        rectangles[idxOfRect].loading = true;
        setRectangles([...rectangles]);

        binaryTransform(`canvas${id}`, `result-canvas${id}`);
        Tesseract.recognize(
            document.getElementById(`result-canvas${id}`).toDataURL(),
            rectangles[index].lang,
            {
                logger: m => {
                    setRectangles(prevRectangles => {
                        const newRectangles = [...prevRectangles];
                        newRectangles[idxOfRect].progress = Math.floor(m.progress * 100);
                        newRectangles[idxOfRect].statement = m.status;
                        return newRectangles;
                    });
                }
            }
        ).then(({ data: { text } }) => {
            const newRectangles = [...rectangles];
            newRectangles[idxOfRect].loading = false;
            newRectangles[idxOfRect].result = text;
            setRectangles(newRectangles);
        }).catch((er) => {
            console.log(er);
        })
    }, [rectangles]);
    const setOcrLang = (lang, index) => {
        setRectangles(prevRectangles => {
            const newRectangles = [...prevRectangles];
             newRectangles[index].lang = lang;
                return newRectangles;
            });
    }
    const onlyBinary = () => {
        if (location.pathname === '/scan') {
            binaryTransform('main', 'main');
        }
    }
    
    useImperativeHandle(ref, () => ({
        createRectHandler,
        clearRectHandler,
        onlyBinary
     }));
    
     return (
         <>
            <canvas
                className={styles['main-canvas']}
                 onMouseDown={mouseDownHandler}
                 onMouseUp={mouseUpHandler}
                 onMouseMove={mouseMoveHandler}
                ref={canvasRef} id="main"></canvas>
            <div className={styles['cropped-container']}>
                {rectangles.map((v, idx) => {
                    return (
                        <div key={v.id} style={{ border: `2px ${v.color} dashed` }} className={styles['cropped-container']}>
                            <div className={ styles['cropped-control-panel']}>
                                <MultiSelect key={v.id} options={languages} onChange={(result) => setOcrLang(result, idx)} />
                                 <button disabled={v.loading} onClick={() => ocrImgHandler(v.id, idx)}>
                                    {v.loading ?
                                        <LoadingSpinner />
                                        : <span>Start OCR</span>
                                    }
                                </button>
                            </div>
                            <div className={styles.cropped}>
                                <canvas width={v.w} height={v.h} id={`canvas${v.id}`}>Your browser don't support html canvas.</canvas>
                            </div>
                            <ProgressBar value={v.progress} statement={v.statement} />
                            <div className={styles.result}>
                                { v.result }
                            </div>
                            <canvas style={{display:'none'}} id={`result-canvas${v.id}`}>Your browser don't support html canvas.</canvas>
                        </div>
                    )
                })}
            </div>
        </>
    )

});
export default MainCanvas