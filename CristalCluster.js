const generatePyramidVertex = require('./pyramidVertex');
const Matrix4 = require('./cuon-matrix').Matrix4;
const Vector4 = require('./cuon-matrix').Vector4;
const Vector3 = require('./cuon-matrix').Vector3;

function CristalCluster(numberOfCristal, angleDistribution) {

  let cluster = {};
  cluster.positions = [];
  cluster.uvs = [];
  cluster.indices = [];

  for(let i=0; i<numberOfCristal; i++) {
    let faceNumber = createRandomFaceNumber();
    let angleDithringFactor = createRandomDisthringFactor();
    let polygonCircleRadius = 1 + 0.2 * Math.random();
    let circleRadiusDithringFactor = 0.2 + Math.random();
    let cylinderHeight = 5 + 3 * Math.random();
    let conHeight = 1 + Math.random();
    let conUvStart = 0.8 + (Math.random() - 0.5) * 0.4;

    let cristal = generatePyramidVertex(faceNumber, polygonCircleRadius, angleDithringFactor, circleRadiusDithringFactor, cylinderHeight, conHeight, conUvStart);

    //transform -----------------------------------------------
    let scaleFactor = createRandomScaleFactor();
    // let scaleFactor = 2;
    let scaleMatrix = new Matrix4();
    scaleMatrix.setScale(scaleFactor, scaleFactor, scaleFactor);
    // console.log(scaleMatrix);

    let rotateAngle = createRandomScaleFactor();
    rotateAngle *= angleDistribution;
    // rotateAngle = 15;
    let rotateCenter = createRandomRotateCenter();
    // console.log(rotateCenter);
    let rotateMatrix = new Matrix4();
    rotateMatrix.setRotate(rotateAngle, rotateCenter.x, rotateCenter.y, rotateCenter.z);
    // rotateMatrix.setRotate(rotateAngle, 0, 0, 1);

    //transform cristal
    let cristalTransformed = transformVertex(cristal, scaleMatrix, rotateMatrix);

    //merge into single buffer
    let currentIndicesLength = cluster.positions.length / 3;
    let extendedIndices = extendIndices(cristalTransformed.indices, currentIndicesLength);
    cluster.indices = cluster.indices.concat(extendedIndices);
    cluster.positions = cluster.positions.concat(cristalTransformed.positions);
    cluster.uvs = cluster.uvs.concat(cristal.uvs);

    // // not transform --------------------------------------------
    // //merge into single buffer
    // let currentIndicesLength = cluster.indices.length;
    // let extendedIndices = extendIndices(cristal.indices, currentIndicesLength);
    // cluster.indices = cluster.indices.concat(extendedIndices);
    // cluster.positions = cluster.positions.concat(cristal.vertexs);
  }

  return cluster;
}

function extendIndices(indices, currentIndicesLength) {
  let extendIndices = [];

  for(let i=0; i<indices.length;i++) {
    let extendIndex = indices[i] + currentIndicesLength;
    extendIndices.push(extendIndex);
  }

  return extendIndices;
}

function transformVertex(cristal, scaleMatrix, rotateMatrix) {
  let transformedCristal = {};
  transformedCristal.positions = [];
  transformedCristal.indices = cristal.indices;
  
  let positions = cristal.vertexs;
  for(let i=0; i<positions.length/3; i++) {
    let v = new Vector4([positions[i*3+0], positions[i*3+1], positions[i*3+2], 1]);
    let vScaled = scaleMatrix.multiplyVector4(v);
    let vScaledRotated = rotateMatrix.multiplyVector4(vScaled);

    transformedCristal.positions.push(vScaledRotated.elements[0]);
    transformedCristal.positions.push(vScaledRotated.elements[1]);
    transformedCristal.positions.push(vScaledRotated.elements[2]);
  }

  return transformedCristal;
}

function createRandomFaceNumber() {
  let r = Math.random();
  if (r < 0.1) {
    return 4;
  } else if (r >= 0.1 && r < 0.2) {
    return 5;
  }  else if (r >= 0.2 && r < 0.6) {
    return 6;
  } else if (r >= 0.6 && r < 0.9) {
    return 8;
  } else if (r > 0.9) {
    return 3;
  }
}

function createRandomDisthringFactor() {
  return Math.abs(Math.random() - 0.5)/2;
}

function createRandomScaleFactor() {
  let r = (Math.random() - 0.5) * 2 + 1;
  return r;
}

function createRandomRotateCenter() {
  let rt = {};

  rt.x = (Math.random() - 0.5) * 10;
  rt.z = (Math.random() - 0.5) * 10;
  rt.y = 1;

  return rt;
}

module.exports = CristalCluster;