function sideBar() {
    var dom = document.getElementById("root");
    var sideBar = document.createElement('div');
    sideBar.innerText = 'header';
    dom.append(sideBar);
}

// ES Module 的暴露函数
export default sideBar;