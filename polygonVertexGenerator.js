/* 
生成二维多边形的顶点数据，顶点位于圆形周边
faceNumber 多边形面数
polygonCircleRadius 包围圆半径
angleDithringFactor 随机角度抖动的比率（0~0.5）
circleRadiusFactor 底部顶点收缩、放大因子系数，会再加 Math.random()后乘以半径, >1则半径最终会大于1，反之亦然
 */

const PI = 3.1415926;

function polygonVertex(faceNumber, polygonCircleRadius, angleDithringFactor, circleRadiusDithringFactor) {
  // let faceNumber = faceNumber || 6;
  // let polygonCircleRadius = polygonCircleRadius || 1;
  // let angleDithringFactor = angleDithringFactor || 0;
  let vertexs = {};
  vertexs.topPositions = [];
  vertexs.downPositions = [];

  // let vertexs = [];
  // 抖动角度
  let angleDithringUnit = 1 / faceNumber * PI;

  // 抖动半径随机距离
  let radiusDithringDistance = Math.random() - 0.5;
  // let radiusDithred = polygonCircleRadius * (1 + radiusDithringDistance);

  let angle, px, py, pxd, pyd;

  for(let i=0; i<faceNumber; i++) {
    let r = randomStep();
    angle = i / faceNumber * PI * 2 + r * angleDithringFactor * angleDithringUnit;

    //computer top positions
    px = Math.sin(angle) * polygonCircleRadius;
    py = Math.cos(angle) * polygonCircleRadius;

    vertexs.topPositions.push(px);
    vertexs.topPositions.push(py);

    //computer down positions
    pxd = Math.sin(angle) * polygonCircleRadius* (circleRadiusDithringFactor + radiusDithringDistance);
    pyd = Math.cos(angle) * polygonCircleRadius* (circleRadiusDithringFactor + radiusDithringDistance);

    vertexs.downPositions.push(pxd);
    vertexs.downPositions.push(pyd);
  }

  return vertexs;
}

function randomStep() {
  let r = Math.random();

  if(r <=0.5) {
    return 1;
  } else {
    return -1;
  }
}

module.exports = polygonVertex;