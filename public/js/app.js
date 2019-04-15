function range(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
}

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
    $('.nav a:not(.active)').hover(function () {
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
        }, 133);
    });

    $(window).on("scroll", function () {
        var sl = -Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
        $(".fixed_box").css("left", sl);
    }).trigger("scroll");

    if($.fn.swiper){
        var mySwiper = $('.epiboly-sc').swiper({
            loop: true,
            pagination : '.pagination',
            paginationClickable :true,
        });

        $('.epiboly-prev').on('click', function () {
            mySwiper.swipePrev();
        });
        $('.epiboly-next').on('click', function () {
            mySwiper.swipeNext();
        });
    }

    if (Function.bind && $.fn.parallax) {
        $(".layer").each(function () {
            var _this = $(this);
            if (!_this.data("depth")) {
                _this.attr("data-depth", range(1000, 2222) / 10000);
            }
        });
        $(".parallax_box").parallax({
            // calibrateX: false,
            // calibrateY: true,
            // invertX: false,
            // invertY: true,
            // limitX: false,
            // limitY: 10,
            // scalarX: 2,
            // scalarY: 8,
            // frictionX: 0.2,
            // frictionY: 0.8
        });
    }
})();
