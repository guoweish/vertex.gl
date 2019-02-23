const polygonVertexGenerator = require('./polygonVertexGenerator');

/* 
生成多边形棱柱的顶点数据
faceNumber 多边形面数
polygonCircleRadius 包围圆半径
angleDithringFactor 随机角度抖动的比率（0~1）
cylinderHeight 立柱高度
conHeight 顶锥高度
conUvStart 顶锥起始点的v值
 */

function generatePyramidVertex(faceNumber, polygonCircleRadius, angleDithringFactor, circleRadiusDithringFactor, cylinderHeight, conHeight, conUvStart) {
  let pyramid = {};
  let vertexs = [];
  // let uvs;
  let indices = [];

  let polygonVertexs = polygonVertexGenerator(faceNumber, polygonCircleRadius, angleDithringFactor, circleRadiusDithringFactor);

  let vertexsCylinderTop = convert2DVertexTo3D(polygonVertexs.topPositions, cylinderHeight);
  let vertexsCylinderDown = convert2DVertexTo3D(polygonVertexs.downPositions, 0);
  let vertexsCon = [0, cylinderHeight+conHeight, 0];

  // 合并所有顶点
  vertexs = [...vertexsCylinderDown, ...vertexsCylinderTop, ...vertexsCon];
  // console.log(vertexs);

  // 生成棱柱包围面索引，除最后一面
  for(let i=0; i<(faceNumber - 1); i++) {
    indices.push(i);
    indices.push(faceNumber + 1 + i);
    indices.push(faceNumber + i);

    indices.push(i);
    indices.push(1 + i);
    indices.push(faceNumber + i + 1);
  }

  // 生成棱柱包围面最后一面索引
  indices.push(faceNumber-1);
  indices.push(faceNumber);
  indices.push(2*faceNumber - 1);

  indices.push(faceNumber-1);
  indices.push(0);
  indices.push(faceNumber);

  // 生成棱柱顶锥三角面索引，除最后一面
  for(let i=0; i<(faceNumber - 1); i++) {
    indices.push(faceNumber * 2);
    indices.push(faceNumber + i);
    indices.push(faceNumber + i + 1);
  }

  // 生成棱柱顶锥三角面索引，除最后一面
  indices.push(faceNumber * 2);
  indices.push(faceNumber * 2 - 1);
  indices.push(faceNumber);

  pyramid.vertexs = vertexs;
  pyramid.indices = indices;
  pyramid.uvs = generateUvs(faceNumber, conUvStart);

  return pyramid;
}

function generateUvs(faceNumber, conUvStart) {
  let uvs = [];

  // down position uvs
  for(let i=0; i<faceNumber; i++) {
    let uv_x = i%2;
    let uv_y = 0.0;

    uvs.push(uv_x);
    uvs.push(uv_y);
  }

  // top position uvs
  for(let i=0; i<faceNumber; i++) {
    let uv_x = i%2;
    let uv_y = conUvStart;

    uvs.push(uv_x);
    uvs.push(uv_y);
  }

  uvs.push(0.5);
  uvs.push(1.0);

  return uvs;
}

function convert2DVertexTo3D(vertexs, height) {
  let vertexs3D = [];

  for(let i=0; i < vertexs.length/2; i++) {
    vertexs3D.push(vertexs[i*2]);
    vertexs3D.push(height);
    vertexs3D.push(vertexs[i*2 + 1]);
  }

  return vertexs3D;
}

module.exports = generatePyramidVertex;