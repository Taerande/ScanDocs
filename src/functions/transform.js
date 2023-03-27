import {matrix, norm, subtract, lusolve, multiply, inv } from 'mathjs';

// // const cv = window.cv;

// export const getHomographyMatrix = (src, des) => {
//   // // Create an empty matrix
//   //   var tempMatrix = [];
//   // // Build the matrix using the points
//   // for (var i = 0; i < src.length; i++) {
//   //   var x = src[i][0];
//   //   var y = src[i][1];
//   //   var u = des[i][0];
//   //   var v = des[i][1];
//   //   tempMatrix.push([x, y, 1, 0, 0, 0, -u*x, -u*y]);
//   //   tempMatrix.push([0, 0, 0, x, y, 1, -v*x, -v*y]);
//   // }
  
  
//   // const B = matrix([[des[0][0]], [des[1][0]], [des[2][0]], [des[3][0]], [des[0][1]], [des[1][1]], [des[2][1]], [des[3][1]]]);

  
//   // const X = multiply(inv(matrix(tempMatrix)), B);


//   // const perspectiveTransformMatrix = matrix([  [X.get([0, 0]), X.get([1, 0]), X.get([2, 0])],
//   // [X.get([3, 0]), X.get([4, 0]), X.get([5, 0])],
//   // [X.get([6, 0]), X.get([7, 0]), 1]
//   // ]);
  
//   // return perspectiveTransformMatrix;
//       var tempMatrix = [];
//   // Build the matrix using the points
//   for (var i = 0; i < src.length; i++) {
//     var x = src[i][0];
//     var y = src[i][1];
//     var u = des[i][0];
//     var v = des[i][1];
// tempMatrix.push([-x, -y, -1, 0, 0, 0, u*x, u*y, u]);
// tempMatrix.push([0, 0, 0, -x, -y, -1, v*x, v*y, v]);
//   }
  
// tempMatrix.push([0, 0, 0, 0, 0, 0, 0, 0, 1]);

//     const A = matrix(tempMatrix);
//     // const B = matrix([[h1], [h2], [h3], [h4], [h5], [h6], [h7], [h8], 1]);
//     const result = matrix([0, 0, 0, 0, 0, 0, 0, 0, 1]);

//     const hd = lusolve(A, result)._data;

//     const H = [
//         [hd[0],hd[1],hd[2]],
//         [hd[3],hd[4],hd[5]],
//         [hd[6],hd[7],hd[8]],
//     ]

//   var h = v[8];
//   // var H = [[h[0], h[1], h[2]], [h[3], h[4], h[5]], [h[6], h[7], h[8]]];

//   // Normalize the homography matrix
//   var norm = H[2][2];
//   for (var i = 0; i < 3; i++) {
//     for (var j = 0; j < 3; j++) {
//       H[i][j] = H[i][j] / norm;
//     }
//   }

//   return H;
// }

// export const getHMatrix = (src, des) => {
//     const srcPoints = matrix(src);
//     const dstPoints = matrix(des);
//     // console.log(srcPoints);
//     // console.log(dstPoints);
//     const H =  transpose(inv(multiply(transpose(srcPoints), srcPoints)), transpose([dstPoints]));
//     return H;
// }

// export const applyHomographyMatrix = (vector, H) => {


//   // const srcPoint = matrix([[vector[0]], [vector[1]], [1]]);
//   // const transFormMatrix = matrix(H);
//   // const dstPoint = multiply(transFormMatrix, srcPoint);
//   // const transformedPoint = [
//   //   dstPoint.get([0, 0]) / dstPoint.get([2, 0]),
//   //   dstPoint.get([1, 0]) / dstPoint.get([2, 0])
//   // ];
//   // return transformedPoint;

//   // Add a 1 to the vector to make it homogeneous
//   var v = [vector[0], vector[1], 1];

//   // Apply the homography matrix
//   var result = [];
//   for (var i = 0; i < 3; i++) {
//     var sum = 0;
//     for (var j = 0; j < 3; j++) {
//       sum += H[i][j] * v[j];
//     }
//     result.push(sum);
//   }
//     // return result;
//   // Convert the result back to non-homogeneous coordinates
// var x = result[0] / result[2];
// var y = result[1] / result[2];
    
//     return { x: Math.round(result[0]), y: Math.round(result[1]) };
// }

export const transformImage = (data, H) => {
    let result = new Array(data.width * data.height * 4);
    let point;
    for (let i = 0; i < data.data.length; i += 4){
        point = applyHomographyMatrix([i, i % 300], H);
        result[point.x + (point.y - 1) * data.width] = data.data[i];
        result[point.x + 1 + (point.y - 1) * data.width] = data.data[i+1];
        result[point.x + 2 + (point.y - 1) * data.width] = data.data[i+2];
        result[point.x + 3 + (point.y - 1) * data.width] = data.data[i+3];
    }
    return result;
}

export const binaryTransform = (inputId, outputId) => {
  
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

export const perspectiveTransform = (inputId, outputId, points) => {
  // 변환되는 이미지의 가로 세로 
  const width = Math.max(
    norm(subtract(points[0], points[1])), norm(subtract(points[2], points[3]))
  )
  const height = Math.max(
    norm(subtract(points[1], points[2])), norm(subtract(points[3], points[0]))
  )

  let src = cv.imread(inputId);
  let dst = new cv.Mat();
  let dsize = new cv.Size(width, height);
  let srcPoints = [...points[0], ...points[1], ...points[3], ...points[2]];

  console.log(srcPoints.flat());


  
  // 좌표 순서 및 시스템 확인 해야댐 좌상단 1, 우상단2, 좌하단3, 우하단4 Z 형태 순서
  let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, srcPoints.flat());
  let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, width, 0, 0, height, width, height]);
  let M = cv.getPerspectiveTransform(srcTri, dstTri);

  // cv2.INTER_CUBIC 4x4 pixel 보간법
  // cv.BORDER_CONSTANT 테두리 인접색으로 적용
  cv.warpPerspective(src, dst, M, dsize, cv.INTER_CUBIC, cv.BORDER_CONSTANT, new cv.Scalar());
  cv.imshow(outputId, dst);

  // 메모리 해제
  src.delete(); dst.delete(); M.delete(); srcTri.delete(); dstTri.delete();

}

