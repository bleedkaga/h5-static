function range(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
}

function isIE() {
    return !!window.ActiveXObject || "ActiveXObject" in window;
}

var lastTime = 0;
var vendors = ['webkit', 'moz', 'o'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
        window[vendors[x] + 'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
        var id = window.setTimeout(function(){
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
}

var isIEBrowser = isIE();


(function () {
    var _window = $(window);
    var _body = $(document.body);
    var _html = $('html');
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

    //弹框
    _body.append('<div class="min_w dialog">' +
        '<div class="shade"></div>' +
        '<div class="dialog-box">' +
        '<button class="dialog-close" onclick="hideDialog();"></button>' +
        '<div class="dialog-content"></div>' +
        '</div>' +
        '</div>');

    var _dialog = $('.dialog');

    window.showDialog = function (content, width, height, css) {
        width = width || 500;
        height = height || 500;
        var _box = _dialog.find('.dialog-box');
        var _content = _dialog.find('.dialog-content');
        var _shade = _dialog.find('.shade');
        _content.html(content);
        _dialog[0].className = '';
        _dialog.addClass('min_w dialog' + (css ? ' ' + css : ''));
        _box.css({
            width: width,
            minHeight: height,
            marginLeft: width / 2 * -1,
            marginTop: height / 2 * -1
        });
        _html.addClass('dialog-show');

        TweenMax.set(_shade, {autoAlpha: 0});
        TweenMax.set(_box, {autoAlpha: 0, y: 300});
        setTimeout(function () {
            TweenMax.to(_shade, 0.233, {autoAlpha: 0.5, ease: Power1.easeOut});
            TweenMax.to(_box, 0.233, {autoAlpha: 1, y: 0, ease: Power1.easeOut});
        }, 16);
    };

    window.hideDialog = function () {
        var _box = _dialog.find('.dialog-box');
        var _shade = _dialog.find('.shade');
        TweenMax.to(_shade, 0.233, {autoAlpha: 0, ease: Power1.easeOut});
        TweenMax.to(_box, 0.233, {
            autoAlpha: 0, y: -300, ease: Power1.easeOut, onComplete: function () {
                _html.removeClass('dialog-show');
            }
        });
    };

    window.showCodeDialog = function () {
        window.showDialog(
            '<div style="color: #2942EE;font-size: 24px;padding-top: 88px;text-align: center;width: 100%;font-weight:bold;">关注组织易服务号领取收入</div>' +
            '<div style="width: 270px;height: 270px;margin: 20px auto auto;">' +
            '<img style="display: block;width: 100%;" src="' + window.staticPath + '/images/code.png"/>' +
            '</div>' +
            '<div style="color: #666;width: 100%;text-align: center;font-size: 16px;margin-top: 30px;">扫描二维码关注</div>',
            500, 500, 'bg');
    };

    if ($.fn.swiper) {

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
            pagination: '.pagination',
            paginationClickable: true,
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
