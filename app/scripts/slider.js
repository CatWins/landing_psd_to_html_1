var timers = [];

$(document).ready(function() {
  $('.slider').each(function() {
    var obj = $(this);
    $(obj).append('<div class=\'nav\'></div>');
    $(obj).find('.col').each(function() {
      $(obj).find('.nav').append('<span rel=\''+$(this).index()+'\'></span>');
      $(this).addClass('slider'+$(this).index());
    });
    $(obj).find('span').first().addClass('on');
    calcWidth(obj);
  });
});

$(window).resize(function() {
  clearTimers();
  $('.slider').each(function() {
    calcWidth($(this));
  });
});

function clearTimers() {
  timers.forEach(function(timer, i, arr) {
    clearInterval(timer);
  });
}

function nextFrame(slider) {
  var current = $(slider).find('.on').attr('rel');
  var max = $(slider).find('.nav').find('span').length;
  var next = (+current + 1 < max) ? +current + 1 : 0;
  $(slider).find('span').removeClass('on');
  $(slider).find('span[rel="'+next+'"]').addClass('on');
  sliderJS(next, slider);
}

function previousFrame(slider) {
  var current = $(slider).find('.on').attr('rel');
  var max = $(slider).find('.nav').find('span').length;
  var next = (+current - 1 >= 0) ? +current - 1 : max - 1;
  $(slider).find('span').removeClass('on');
  $(slider).find('span[rel="'+next+'"]').addClass('on');
  sliderJS(next, slider);
}

function calcWidth(slider) {
  if ($(window).width() < 1399) {
    var w = Math.floor($(slider).width());
    var wm = Math.ceil($(slider).find('.col').width(w).outerWidth(true));
    $(slider).find('.slider-wrap').width($(slider).find('.col').length * wm);
    var frame = $(slider).find('.on').attr('rel');
    sliderJS(frame, slider);
    timers.push(setInterval(function() {
      nextFrame(slider);
    }, 3000));
  } else {
    $(slider).find('.slider-wrap').removeAttr('style');
    $(slider).find('.col').removeAttr('style');
  }
}

function sliderJS(obj, sl) {
  var wrap = $(sl).find('.slider-wrap');
  var bl = $(sl).find('.col.slider'+obj);
  var step = $(bl).outerWidth(true);
  $(wrap).css('margin-left', -step*obj);
}

$(document).on('click', '.slider .nav span', function() {
  var sl = $(this).closest('.slider');
  $(sl).find('span').removeClass('on');
  $(this).addClass('on');
  var obj = $(this).attr('rel');
  sliderJS(obj, sl);
  return false;
});

$(document).on('swipe', '.slider', function(e) {
  if (e.originalEvent.detail.direction == 'right') {
    nextFrame(this);
  } else if (e.originalEvent.detail.direction == 'left') {
    previousFrame(this);
  }
  return false;
});
