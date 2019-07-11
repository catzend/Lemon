import "../src/index.css";
import number from './number';
console.log(2222);

if (module.hot) {
    module.hot.accept('./number', function () {
        number()
    })
}