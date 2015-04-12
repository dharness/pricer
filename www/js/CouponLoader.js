isTouchSupported = 'ontouchstart' in window;
startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
endEvent = isTouchSupported ? 'touchend' : 'mouseup';

function CouponLoader() {}

CouponLoader.prototype.init = function() {

    var down = {
        x: 0,
        y: 0
    }
    window.kingCoup.count = 0;

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

    initRange = function () {
        setTimeout(function(){}, 2000);
        $("#slider").on("input", function() {
            document.getElementById("slider-value").innerHTML = this.value;
        });
    }

     initSlider = function () {
        setTimeout(function() {},1500);
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
     }


    $("#dragImage").on(endEvent, function() {
        console.log('ending')
    });

    window.kingCoup.getCoupons();
}


CouponLoader.prototype.next = function() {

    updateSelectedCoupions();
    // console.log(currentCoupons);
    var imgToShow = window.currentCoupons[window.kingCoup.count].showImageStandardBig;
    window.kingCoup.count++;
    console.log("data", window.currentCoupons)
    console.log("img ", imgToShow)
    var strVar = "";
    strVar += '<img id=\"dragImage\" width=\"300\" height=\"200\" src=\"' + imgToShow + '\">';

    $('#imageContainer').html(strVar);
}

function updateSelectedCoupions() {

}


CouponLoader.prototype.getCoupons = function() {


    $.post("http://45.33.70.39:3002/deals", {
        username: "morgan"
    }).done(function(data) {
        window.currentCoupons = data;
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

window.kingCoup = new CouponLoader();
window.kingCoup.init();