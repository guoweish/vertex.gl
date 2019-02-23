# vertex.gl
A procedural geometry generator for graphic pipline. It will generate a single buffer with positions, uvs and indices supportted. You can calculate normal in fragment shader to do the lightting stuff.

Currently only a crystal like geometry is supported. Hopefully I'll have time to add more interesting things. 

Have fun!

## Sample
### Crystal
#### Blue Crystal with 45 degree distribution limitition.
![canvas-preview](https://raw.githubusercontent.com/guoweish/vertex.gl/master/samples/cristal-blue.png "uv")

#### Red Crystal with 180 degree distribution limitition.
![canvas-preview](https://raw.githubusercontent.com/guoweish/vertex.gl/master/samples/cristal-red.png "uv")

## Usage
### Install
```
npm install -i vertex.gl
```

### API reference
```
const VTX = require('vertex.gl);

const vertexBuffer = VTX.cristals(27, 45);

const positions = vertexBuffer.positions;
const uvs = vertexBuffer.uvs;
const indices = vertexBuffer.indics;

//do the rendering stuff ...
```