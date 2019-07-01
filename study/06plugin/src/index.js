import load from './loader.png';
import style from './index.css';
// import creatTest from './creatTest.js';

// creatTest();
// import "./index.css";

var img = new Image();

img.src = load;
console.log(load);
// img.src = load;
// img.classList.add('test');
img.classList.add(style.root);
// img.className = style.test;
document.getElementById("root").append(img);
document.getElementById("root").classList.add(style.root);