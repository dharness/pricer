var isTouchSupported = 'ontouchstart' in window;
var startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
var moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
var endEvent = isTouchSupported ? 'touchend' : 'mouseup';

var x;
var y;

var down = {
    x: 0,
    y: 0
}

$("#dragImage").on(startEvent, function(e) {
    down.x = e.originalEvent.touches[0].pageX;
    down.y = e.originalEvent.touches[0].pageY;

    dX = $("#dragImage").position().left - down.x;
    dY = $("#dragImage").position().top - down.y;
});

$("#dragImage").on(moveEvent, function(e) {
    $("#dragImage").css({
        position: "absolute",
        marginLeft: 0,
        marginTop: 0,
        left: e.originalEvent.touches[0].pageX + dX,
        top: e.originalEvent.touches[0].pageY + dY
    });
});

$("#dragImage").on(endEvent, function() {
    console.log('ending')
});