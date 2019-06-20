function footer() {
    var dom = document.getElementById("root");
    var footer = document.createElement('div');
    footer.innerText = 'header';
    dom.append(footer);
}

// ES Module 的暴露函数
export default footer;