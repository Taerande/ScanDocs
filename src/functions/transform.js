import {norm, subtract} from 'mathjs';
export const binaryTransform = (inputId, outputId) => {
  console.log(inputId, outputId);

  const cv = window.cv;
  
  // inputId, oputId 확인
  let inputCanvas = document.getElementById(inputId);
  let outputCanvas = document.getElementById(outputId);

  if (!inputCanvas || !outputCanvas) return

  // 이미지 로드
  let src = cv.imread(inputId);

  // grayscale 적용
  let gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  // 이진화 임계값 설정
  // 140~200값 사용하기 좋음, cv.THRESH_BINARY | cv.THRESH_OTSU 자동 최적화
  let dst = new cv.Mat();
  cv.threshold(gray, dst, 0, 255, cv.THRESH_BINARY | cv.THRESH_OTSU);

  cv.imshow(outputId, dst);

  // 메모리 해제
  src.delete(); gray.delete(); dst.delete();
}

export const perspectiveTransform = (inputId, points) => {
  const cv = window.cv;
  // 변환되는 이미지의 가로 세로 
  const width = Math.round(Math.max(
    norm(subtract(points[0], points[1])), norm(subtract(points[2], points[3])))
  )
  const height = Math.round(Math.max(
    norm(subtract(points[1], points[2])), norm(subtract(points[3], points[0])))
  )

  let src = cv.imread(inputId);
  let dst = new cv.Mat();
  let dsize = new cv.Size(width, height);

  // 좌표 순서 및 시스템 확인 해야댐 좌상단 1, 우상단2, 좌하단3, 우하단4 Z 형태 순서

  let srcPoints = [...points[0], ...points[1], ...points[3], ...points[2]].map(v=>Math.round(v));

  

  let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, srcPoints.flat());
  let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, width, 0, 0, height, width, height]);
  let M = cv.getPerspectiveTransform(srcTri, dstTri);

  // cv2.INTER_CUBIC 4x4 pixel 보간법
  // cv.BORDER_CONSTANT 테두리 인접색으로 적용
  cv.warpPerspective(src, dst, M, dsize, cv.INTER_CUBIC, cv.BORDER_CONSTANT, new cv.Scalar());
  cv.imshow('result', dst);
  let reDst = new cv.Mat();
  cv.resize(dst, reDst, dsize, 0, 0, cv.INTER_AREA);
  cv.imshow(inputId, reDst);
  // 메모리 해제
  src.delete(); dst.delete(); M.delete(); srcTri.delete(); dstTri.delete();

}



// export const foregroundExtraction = (inputId, inputRect) => {
//   let src = cv.imread(inputId);
//   cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);
//   let mask = new cv.Mat();
//   let bgdModel = new cv.Mat();
//   let fgdModel = new cv.Mat();
//   let rect = new cv.Rect(inputRect.x, inputRect.y, inputRect.w, inputRect.h);
//   cv.grabCut(src, mask, rect, bgdModel, fgdModel, 1, cv.GC_INIT_WITH_RECT);
//   // draw foreground
//   for (let i = 0; i < src.rows; i++) {
//       for (let j = 0; j < src.cols; j++) {
//           if (mask.ucharPtr(i, j)[0] == 0 || mask.ucharPtr(i, j)[0] == 2) {
//               src.ucharPtr(i, j)[0] = 0;
//               src.ucharPtr(i, j)[1] = 0;
//               src.ucharPtr(i, j)[2] = 0;
//           }
//       }
//   }
//   // draw grab rect
//   let color = new cv.Scalar(0, 0, 255);
//   let point1 = new cv.Point(rect.x, rect.y);
//   let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
//   cv.rectangle(src, point1, point2, color);
//   cv.imshow(`result-${inputId}`, src);
//   src.delete(); mask.delete(); bgdModel.delete(); fgdModel.delete();


// }
