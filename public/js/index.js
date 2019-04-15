(function () {
    function range(a, b) {
        return Math.floor(Math.random() * (b - a) + a);
    }

    var _window = $(window);
    var _header = $('.header');
    _window.on("scroll", function () {
        var scrollTop = _window.scrollTop();
        if (scrollTop > 100) {
            _header.addClass('shade');
        } else {
            _header.removeClass('shade');
        }
    }).trigger('scroll');

    //animate
    var text1 = '组织变革辅助智能工具';
    var text2 = '按需用工专家';
    var _t1 = $('.t1');
    var _t2 = $('.t2');
    var _t3a = $('.t3 i');

    text1.split('').forEach(function (t) {
        _t1.append('<i>' + t + '</i>');
    });
    text2.split('').forEach(function (t) {
        _t2.append('<i>' + t + '</i>');
    });

    var _i0_0 = $('.i0-0');
    var _i0_1 = $('.i0-1');
    var _i0_2 = $('.i0-2');
    var _i0_3 = $('.i0-3');
    var _i0_4 = $('.i0-4');
    var _i0_5 = $('.i0-5');
    var _i0_6 = $('.i0-6');
    var _i0_7 = $('.i0-7');
    var tList = $.makeArray(_t1.find('i')).concat($.makeArray(_t2.find('i')));


    //初始化
    TweenMax.set(tList, {autoAlpha: 0});
    TweenMax.set(_t3a, {autoAlpha: 0, y: _t3a.height()});

    TweenMax.set(_i0_0, {y: _i0_0.height(), autoAlpha: 0});
    TweenMax.set(_i0_1, {y: _i0_1.height(), autoAlpha: 0});
    TweenMax.set(_i0_2, {y: _i0_2.height(), autoAlpha: 0});
    TweenMax.set(_i0_3, {y: _i0_3.height(), autoAlpha: 0});
    TweenMax.set(_i0_4, {y: _i0_4.height(), autoAlpha: 0});
    TweenMax.set(_i0_5, {y: -50, autoAlpha: 0});
    TweenMax.set(_i0_6, {y: -20, autoAlpha: 0, scaleX: 0.3});
    TweenMax.set(_i0_7, {autoAlpha: 0, scaleX: 0.9});


    //主要
    TweenMax.staggerTo(tList, 0.8, {
        autoAlpha: 1,
        ease: Power1.easeIn,
        onComplete: function () {
            TweenMax.staggerTo(_t3a, 0.4, {
                autoAlpha: 1,
                y: 0,
                ease: Ease.easeIn,
            }, 0.1);
        }
    }, 0.05);

    //元素
    TweenMax.staggerTo([
        _i0_0, _i0_1, _i0_2, _i0_3, _i0_4,
    ], 0.8, {
        delay: 1,
        autoAlpha: 1,
        y: 0,
        ease: Power1.easeOut,
    }, 0.1, function () {

        TweenMax.to(_i0_5, 0.8, {
            autoAlpha: 1, y: 0, delay: 0, onComplete: function () {
                TweenMax.to(_i0_5, range(200, 400) / 100, {
                    yoyo: true,
                    y: -range(10, 20),
                    repeat: -1,
                    ease: Power1.easeInOut
                });

                TweenMax.to(_i0_6, 1.2, {
                    // yoyo: true,
                    // repeat: -1,
                    // repeatDelay: 1,
                    scaleX: 1,
                    y: 0,
                    autoAlpha: 1,
                    ease: Elastic.easeOut.config(1, 0.3),
                });
            }
        });


        TweenMax.to(_i0_0, range(200, 400) / 100, {yoyo: true, y: -range(5, 20), repeat: -1, ease: Power1.easeInOut});
        TweenMax.to(_i0_1, range(200, 400) / 100, {yoyo: true, y: -range(5, 20), repeat: -1, ease: Power1.easeInOut});
        TweenMax.to(_i0_2, range(200, 400) / 100, {yoyo: true, y: -range(5, 20), repeat: -1, ease: Power1.easeInOut});
        TweenMax.to(_i0_3, range(200, 400) / 100, {yoyo: true, y: -range(5, 20), repeat: -1, ease: Power1.easeInOut});
        TweenMax.to(_i0_4, range(200, 400) / 100, {yoyo: true, y: -range(5, 20), repeat: -1, ease: Power1.easeInOut});

        TweenMax.to(_i0_7, 0.8, {yoyo: true, repeatDelay: 2, repeat: -1, autoAlpha: 1, scaleX: 1, ease: Power1.easeInOut});
    });
})();
