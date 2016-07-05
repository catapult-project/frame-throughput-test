var BOX_WIDTH = 100;
var BOX_SPEED = 10;

var box1;
var box2;
var box3;
var box4;

var animationFrameRequest;
var timeoutForJank;

function setCurrentAnimationBasedOnRadioButtons() {
  var form_elements = document.getElementById('form').elements.animate;
  var on = form_elements.value;

  window.cancelAnimationFrame(animationFrameRequest);
  box2.animation.pause();
  box3.animation.pause();
  box4.firstChild.pause();

  switch(on) {
  case "raf":
    animationFrameRequest = window.requestAnimationFrame(tickBox1);
    break;
  case "main_css":
    box2.animation.play();
    break;
  case "compositor_css":
    box3.animation.play();
    break;
  case "video":
    box4.firstChild.play();
    break;
  case "ALL":
    animationFrameRequest = window.requestAnimationFrame(tickBox1);
    box2.animation.play();
    box3.animation.play();
    box4.firstChild.play();
    break;
  }
}

function initForm() {
  var form = document.getElementById('form');
  var animate_controls = form.elements.animate;
  console.log(animate_controls);
  for (i of animate_controls) {
    i.onchange = setCurrentAnimationBasedOnRadioButtons;
  }

  var jank_checkbox = form.elements.jank;
  console.log(jank_checkbox);
  jank_checkbox.onchange = function() {
    if(jank_checkbox.checked) {
      jankItUp();
    } else {
      window.clearTimeout(timeoutForJank);
    }
  }
}

function tickBox1() {
  animationFrameRequest = window.requestAnimationFrame(tickBox1);
  box1.left += BOX_SPEED;
  if (box1.left > document.body.clientWidth - BOX_WIDTH) {
    box1.left = 0;
  }
  box1.style.left = box1.left + "px";
}

function jankItUp() {
  var start = performance.now();
  while (performance.now() < start + 2000) {}
  timeoutForJank = window.setTimeout(jankItUp, 4000);
}

var animation;
document.addEventListener("DOMContentLoaded", function(event) {
  box1 = document.getElementById("box1");
  box2 = document.getElementById("box2");
  box3 = document.getElementById("box3");
  box4 = document.getElementById("box4");

  box1.left = 0;

  box2.animation = box2.animate([
  {
    left: '0px'
  }, {
    left: (document.body.clientWidth - BOX_WIDTH) + 'px'
  }], {
    duration: document.body.clientWidth / BOX_SPEED * 16.66,
    iterations: Infinity
  });

  box3.animation = box3.animate([
  {
    transform: 'translate(0px, 0px)'
  },
  {
    transform: 'translate(' + (document.body.clientWidth - BOX_WIDTH) + 'px, 0px)'
  }], {
    duration: document.body.clientWidth / BOX_SPEED * 16.66,
    iterations: Infinity
  });

  initForm();
  setCurrentAnimationBasedOnRadioButtons();
});
