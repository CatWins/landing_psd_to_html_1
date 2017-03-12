var x_start = null;
var y_start = null;
var target = null;

document.addEventListener('touchstart', function(e) {
  x_start = e.touches[0].clientX;
  y_start = e.touches[0].clientY;
  target = e.target;
});

document.addEventListener('touchmove', function(e) {
  if (!x_start || !y_start || !target) return;

  var x_curr = e.touches[0].clientX;
  var y_curr = e.touches[0].clientY;

  var x_diff = x_start - x_curr;
  var y_diff = y_start - y_curr;

  var direction = null;

  if (Math.abs(x_diff) > Math.abs(y_diff)) {
    direction = (x_diff < 0) ? 'left' : 'right';
  } else {
    direction = (y_diff > 0) ? 'up' : 'down';
  }

  fireSwipeEvent(target, direction);

  x_start = null;
  y_start = null;
  target = null;
});

function fireSwipeEvent(target, direction) {
  var swipe_event = new CustomEvent('swipe', {
    detail: {
      'direction': direction
    },
    bubbles: true,
    cancelable: false
  });
  target.dispatchEvent(swipe_event);
}
