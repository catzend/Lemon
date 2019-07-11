import loader from './loader.png'

console.log(loader);
var img = new Image();

img.src = 'dist/' + loader;

var root = document.getElementById('root');
root.append(img);