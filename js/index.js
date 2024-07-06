const pug = require('./nodeScripts/pug-compiler.js');
const scss = require('./nodeScripts/scss-compiler.js')
const js = require('./nodeScripts/js-builder.js');
const img = require('./nodeScripts/img-builder.js');

pug.startCompile();
scss.startCompile();

js.startBuilding();
img.buildImgFiles();