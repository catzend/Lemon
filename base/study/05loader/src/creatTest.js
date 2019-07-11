import load from './loader.png'
import style from './index.css';

function creatTest() {
    var img = new Image();

    img.src = 'dist/' + load;
    // img.src = load;
    // img.classList.add('test');
    img.classList.add(style.test);
    // img.className = style.test;
    document.getElementById("root").append(img);
}
export default creatTest;