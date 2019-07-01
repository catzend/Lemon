function header() {
    var dom = document.getElementById("root");
    var header = document.createElement('div');
    header.innerText = 'header';
    dom.append(header);
}

// ES Module 的暴露函数
export default header;