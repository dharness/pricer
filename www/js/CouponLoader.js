isTouchSupported = 'ontouchstart' in window;
startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
endEvent = isTouchSupported ? 'touchend' : 'mouseup';

var CouponLoader = function() {}

CouponLoader.prototype.init = function() {

    alert('init')
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

        checkThreshold();
    });

    $("#dragImage").on(endEvent, function() {
        console.log('ending')
    });

    this.getCoupons();
}

CouponLoader.prototype.next = function() {
    var strVar = "";
    strVar += "<img id=\"dragImage\" width=\"300\" height=\"200\" src=\"resources\/images\/sampleCoupon.png\">";

    $('#imageContainer').html(strVar);
}

CouponLoader.prototype.getCoupons = function() {
    $.get("http://localhost:3002/deals", function(data, status) {
        window.coupons = data;
        alert("done")
        $("#dragImage").attr("src", data[0].showImageStandardSmall);
    });
}


CouponLoader.prototype.checkThreshold = function() {
    var tHold = screen.width / 4;

    var centerX = $("#dragImage").position().left + $("#dragImage").attr("width") / 2;
    console.log(centerX);

    // get the width of the screen and compare
    if (centerX < tHold) {
        alert('Swiped left');
        this.next();
    } else if (centerX > screen.width - tHold) {
        alert('Swiped right');
        this.next();
    }

}

var kingCoup = new CouponLoader();
kingCoup.init();