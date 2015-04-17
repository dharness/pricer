app.initialize();

function erase() {
    window.username = 'morgan'; //user.value;
    window.kingCoup.getCoupons();


    var strVar = "";
    strVar += "                    <form>";
    strVar += "                        <div class=\"ui-field-contain\">";
    strVar += "                            <center><label for=\"slider\"><img src=\"img\/radius.png\"><\/img><\/label><br>";
    strVar += "                            <input type=\"range\" name=\"slider\" id=\"slider\" min=\"0\" max=\"100\" value=\"50\" >";
    strVar += "                            <p>Current Search Radius: <span id = \"slider-value\">50<\/span> mi<\/p><\/center><br><br>";
    strVar += "                        <\/div>";
    strVar += "                        <div class=\"ui-field-contain\">";
    strVar += "                            <center><label for=\"sliderAdventure\"><img src=\"img\/adventurous.png\"><\/img<\/label><br>";
    strVar += "                            <input type=\"range\" name=\"sliderAdventure\" id=\"sliderAdventure\" min=\"10\" max=\"30\" value=\"20\" step = \"10\">";
    strVar += "                            <p><span id = \"sliderAdventure-value\">Indiana Jones<\/span><\/p><\/center>";
    strVar += "                        <\/div>";
    strVar += "                    <\/form>";


    $('#theBody').html("<swipe-view><fizz>" + strVar + "</fizz><image-container id='imageContainer'></image-container></swipe-view>");
    initRange();
    initSlider();
}

function moveToCV() {

    var data = ["3", "3e", "3gg", "3csd", "3gw", "399"]

    var strVar = "";
    strVar += "<coupons-view><list id='couponsList'><\/list><\/coupons-view>";
    $('#theBody').html(strVar);

    setTimeout(function() {
        $.post("http://dylandjoegotosanfrancisco.com:3002/getSavedDeals", {
            username: "morgan"
        }).done(function(res) {
            var data = res[0].deals;

            var strVar = "";
            for (var i = 0; i < data.length; i++) {
                // Create the list item:
                var imgToShow = data[i].showImageStandardBig;
                var dealTitle = data[i].dealTitle;
                var dealInfo = data[i].dealInfo.substring(0, 20) + '...';

                strVar += "<coupon-shell width='400px' height='400px'><couponImage><img = src='" + imgToShow + "'\/><\/couponImage><couponTitle>" + dealTitle + "<\/couponTitle><couponDetails>" + dealInfo + "<\/couponDetails><\/coupon-shell>";

            }
            $('#couponsList').html(strVar);
        });
    }, 1000);
}