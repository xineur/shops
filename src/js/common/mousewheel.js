(function(global, $) {

var isFireFox = global.navigator.userAgent.toLowerCase().indexOf('firefox') >= 0
  , oldDispatch = $.event.dispatch
  , special;

if (isFireFox) {
  special = $.event.special;

  special.mousewheel = {bindType: "DOMMouseScroll", delegateType: "DOMMouseScroll"};
}

$.event.dispatch = function(event) {
  var args;

  if (event.type === "DOMMouseScroll" || event.type === "mousewheel") {
    args = Array.prototype.slice.call(arguments, 1);
    event = $.event.fix(event);

    if (event.type === "DOMMouseScroll") {
      event.wheelDelta = event.originalEvent.detail * -40;
    } else {
      event.wheelDelta = event.originalEvent.wheelDelta;
    }
    
    args.unshift(event);

  }
  
  oldDispatch.apply(this, args || arguments);
};
})(this, jQuery);