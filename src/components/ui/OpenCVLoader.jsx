import React from 'react';
import Loadable from 'react-loadable';

const OpenCVLoader = Loadable({
  loader: () => import('../../lib/opencv'),
  loading: () => <div>Loading OpenCV.js...</div>,
});

export default OpenCVLoader;