# vertex.gl
A procedural geometry generator for graphic pipline. It will generate a single buffer with positions, uvs and indices supportted. You can calculate normal in fragment shader to do the lightting stuff.

Currently only a crystal like geometry is supported. Hopefully I'll have time to add more interesting things. 

Have fun!

一个随机几何体顶点生成器，可用于创意编程之类的捣鼓。

生成的单个几何体包括位置、纹理坐标2种顶点，包含索引。没有生成法线，可以在片元着色器中用微分计算法线处理光照。

目前仅支持水晶簇几何体，希望能持续填坑，增加更多随机几何体样式。


## Sample
### Crystal
#### Blue Crystal with 45 degree distribution limitition. 27个单晶45度随机分布的蓝色水晶簇。
![canvas-preview](https://raw.githubusercontent.com/guoweish/vertex.gl/master/samples/cristal-blue.png "uv")

#### Red Crystal with 180 degree distribution limitition. 77个单晶180度随机分布的红色水晶簇。
![canvas-preview](https://raw.githubusercontent.com/guoweish/vertex.gl/master/samples/cristal-red.png "uv")

## Usage
### Install
```
npm install -i vertex.gl
```

### API reference
```
const VTX = require('vertex.gl);

//generate a crystal geometry buffer with 27 pyramids and a random distribution angle of 45 degree.
const vertexBuffer = VTX.cristals(27, 45);

const positions = vertexBuffer.positions;
const uvs = vertexBuffer.uvs;
const indices = vertexBuffer.indics;

//do the rendering stuff ...
```