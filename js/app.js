(function () {
    var _window = $(window);
    var _body = $(document.body);
    var WW = 0;
    var WH = 0;
    var _WResetTimer = null;
    var _WTime = 0;
    _window.on("resize", function () {
        clearTimeout(_WResetTimer);
        WW = _window.width();
        WH = _window.height();
        _WResetTimer = setTimeout(function () {
            ImageView.reset();
        }, _WTime);
    }).trigger("resize");

    $(".iv_image").each(function () {
        ImageView.init(this, {
            callback: function (_, _image, _) {
                _image.addClass("active");
            }
        });
    });

    var navTimerMap = {};
    $('.nav a').hover(function () {
        var _this = $(this);
        var index = _this.data('index');
        clearTimeout(navTimerMap[index]);
        $(this).removeClass('moveOut').addClass('moveIn');
    }, function () {
        var _this = $(this);
        var index = _this.data('index');
        clearTimeout(navTimerMap[index]);
        _this.removeClass('moveIn').addClass('moveOut');
        navTimerMap[index] = setTimeout(function () {
            _this.removeClass('moveOut')
        }, 233);
    });

    $(window).on("scroll", function () {
        var sl = -Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
        $(".fixed_box").css("left", sl);
    }).trigger("scroll");
})();
