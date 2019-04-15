function range(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
}

function isIE() {
    return !!window.ActiveXObject || "ActiveXObject" in window;
}

var isIEBrowser = isIE();


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

        $('.epiboly-list span').each(function () {
            var _this = $(this);
            var textArray = _this.html().split('');
            _this.html('');
            $.each(textArray, function (index, t) {
                _this.append('<i class="p-3d">' + t + '</i>');
            })
        });

        var mySwiper = $('.epiboly-sc').swiper({
            speed: 666,
            loop: true,
            pagination : '.pagination',
            paginationClickable :true,
            grabCursor: true,
            progress: !isIEBrowser,
            // onSlideChangeStart: slideChangeStart,
            onProgressChange: function (swiper) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slide = swiper.slides[i];
                    var progress = slide.progress;
                    var translate = progress * swiper.width;
                    var characters = $(slide).find('.p-3d');
                    // characters = $.makeArray(characters).sort(function (a, b) {
                    //     return Math.random() > 0.5 ? 1 : -1;
                    // });
                    for (var j = 0; j < characters.length; j++) {
                        var charScale = progress * 1500 * (characters.length - j) / characters.length;
                        var charOpacity = 1 - Math.min(Math.abs(progress), 1);
                        swiper.setTransform(characters[j], 'translate3d(0,0,' + (charScale) + 'px)');
                        characters[j].style.opacity = charOpacity;
                    }
                    swiper.setTransform(slide, 'translate3d(' + translate + 'px,0,0)');
                }
            },
            onTouchStart: function (swiper) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.setTransition(swiper.slides[i], 0);
                    var characters = $(swiper.slides[i]).find('.p-3d');
                    for (var j = 0; j < characters.length; j++) {
                        swiper.setTransition(characters[j], 0);
                    }
                }
            },
            onSetWrapperTransition: function (swiper, speed) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.setTransition(swiper.slides[i], speed);
                    var characters = $(swiper.slides[i]).find('.p-3d');
                    for (var j = 0; j < characters.length; j++) {
                        swiper.setTransition(characters[j], speed);
                    }
                }

            }
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
