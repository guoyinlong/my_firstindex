function next_pic(wrap) {
  index++;
  if (index > 4) {
    index = 0;
  }
  showCurrentDot(wrap);
  var newLeft;
  if (wrap.style.left === "-3600px") {
    newLeft = -1200;
  } else {
    newLeft = parseInt(wrap.style.left) - 600;
  }
  wrap.style.left = newLeft + "px";
}
// 上一页
function prev_pic(wrap) {
  index--;
  if (index < 0) {
    index = 4;
  }
  showCurrentDot(wrap);
  var newLeft;
  if (wrap.style.left === "0px") {
    newLeft = -2400;
  } else {
    newLeft = parseInt(wrap.style.left) + 600;
  }
  wrap.style.left = newLeft + "px";
}
// 定时器 --- 自动播放
let timer = null;

function autoPlay(wrap) {
  timer = setInterval(function () {
    next_pic(wrap);
  }, 2000);
}

// 圆点导航
let index = 0;
let dots = document.getElementsByTagName("span");
// 显示当前是第几张图片
function showCurrentDot(wrap) {
  for (var i = 0, len = dots.length; i < len; i++) {
    dots[i].className = "";
  }
  dots[index].className = "on";
}
//最开始和最后的照片修整
for (var i = 0, len = dots.length; i < len; i++) {
  (function (i) {
    let wrap = document.querySelector(".wrap");
    dots[i].onclick = function () {
      var dis = index - i;
      if (index == 4 && parseInt(wrap.style.left) !== -3000) {
        dis = dis - 5;
      }
      //和使用prev和next相同，在最开始的照片5和最终的照片1在使用时会出现问题，导致符号和位数的出错，做相应地处理即可
      if (index == 0 && parseInt(wrap.style.left) !== -600) {
        dis = 5 + dis;
      }
      wrap.style.left = (parseInt(wrap.style.left) + dis * 600) + "px";
      index = i;
      showCurrentDot(wrap);

    }
  })(i);
}

function init() {
  var wrap = document.querySelector(".wrap");
  var next = document.querySelector(".arrow_right");
  var prev = document.querySelector(".arrow_left");
  // 当鼠标点击上下箭头
  next.onclick = function () {
    next_pic(wrap);
  }
  prev.onclick = function () {
    prev_pic(wrap);
  }
  //启动定时器
  autoPlay(wrap);
  // 鼠标滑过 取消自动播放
  var container = document.querySelector(".container");
  container.onmouseenter = function () {
    clearInterval(timer);
  }
  container.onmouseleave = function () {
    autoPlay(wrap);
  }
}
window.addEventListener('load', init, false);