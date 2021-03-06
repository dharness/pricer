isTouchSupported = 'ontouchstart' in window;
startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
endEvent = isTouchSupported ? 'touchend' : 'mouseup';

var CouponLoader = function() {}

CouponLoader.prototype.init = function() {

    var down = {
        x: 0,
        y: 0
    }
    kingCoup.count = 0;

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

    $("#slider").on("input", function() {
        document.getElementById("slider-value").innerHTML = this.value;
    })

    $("#sliderAdventure").on("input", function() {
        var currentVal = this.value;
        if (currentVal == 10) {
            document.getElementById("sliderAdventure-value").innerHTML = "Scooby Doo & Shaggy";
        } else if (currentVal == 20) {
            document.getElementById("sliderAdventure-value").innerHTML = "Indiana Jones";
        } else if (currentVal == 30) {
            document.getElementById("sliderAdventure-value").innerHTML = "Chuck Norris";
        }
    });

    $("#dragImage").on(endEvent, function() {
        console.log('ending')
    });

    this.getCoupons();
}


CouponLoader.prototype.next = function() {
    // console.log(currentCoupons);
    var imgToShow = currentCoupons[kingCoup.count].showImageStandardBig;
    kingCoup.count++;
    var strVar = "";
    strVar += '<img id=\"dragImage\" width=\"300\" height=\"200\" src=\"' + imgToShow + '\">';

    $('#imageContainer').html(strVar);
}

CouponLoader.prototype.getCoupons = function() {


    // var request = $.ajax({
    //     type: 'POST',
    //     dataType: 'json',
    //     contentType: 'application/json; charset=utf-8',
    //     url: 'http://localhost:3002/deals',
    //     data: JSON.stringify({
    //         username: "morgan"
    //     }),
    //     crossDomain: true
    // });

    // request.done(function(data) {
    //     currentCoupons = data;
    //     console.log("Got the dataa");
    // });

    // request.fail(function(jqXHR, textStatus) {
    //     console.log("request error: " + textStatus);
    // });



    $.post("http://localhost:3002/deals", {
        username: "morgan"
    }).done(function(data) {
        currentCoupons = data;
        console.log("Got the dataa");
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

kingCoup = new CouponLoader();
kingCoup.init();