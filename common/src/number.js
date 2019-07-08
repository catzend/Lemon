function number() {
  var btn = document.createElement("button");
  btn.innerHTML = "点击";
  document.body.append(btn);
  var div = document.createElement("div");
  div.setAttribute("id", "root");
  div.innerHTML("0");
  var numbers = div.innerHTML();
  btn.onclick = function () {
    numbers = numbers + 1;
    div.innerHTML(numbers);
  }
}

function add(a, b) {
  return a - b;
}

// export default number;
export {
  number,
  add
}