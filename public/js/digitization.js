(function () {

    var textMap = [
        {
            text: '心灵自由和为结果而战并不矛盾',
            o: $('.section1 .inline .title')
        },
        {
            text: '有一群人',
            o: $('.section1 .inline .indent')
        },
        {
            text: '他们有情怀、有知识、有技术',
            o: $('.section1 .inline .p1')
        },
        {
            text: '他们为灵魂自由而欢愉',
            o: $('.section1 .inline .p2')
        },
        {
            text: '但他们更希望为了明确的目标和结果而战',
            o: $('.section1 .inline .p3')
        },
        {
            text: '灵魂不灭，热血不冷，战斗不息，生命不止',
            o: $('.section1 .inline .p4')
        }
    ];
    var gather = [];
    $.each(textMap, function (i, tm) {
        tm.o.html('');
        $.each(tm.text.split(''), function (i, t) {
            tm.o.append('<i>' + t + '</i>');
        });
        gather = gather.concat($.makeArray(tm.o.find('i')));
    });

    TweenMax.set(gather, {autoAlpha: 0});
    TweenMax.staggerTo(gather, 0.6, {
        autoAlpha: 1,
        ease: Power1.easeIn
    }, 0.05);

    // var mapAddrArr = [
    //     {x: 636, y: 286},
    //     {x: 655, y: 300},
    //     {x: 680, y: 367},
    //     {x: 491, y: 374},
    //     {x: 755, y: 433},
    //     {x: 412, y: 471},
    //     {x: 777, y: 485},
    //     {x: 529, y: 492},
    //     {x: 614, y: 492},
    //     {x: 669, y: 533},
    //     {x: 469, y: 581},
    //     {x: 658, y: 650}
    // ];
    // mapAddrArr = mapAddrArr.sort(function () {
    //     return Math.random() > 0.5 ? 1 : -1;
    // });

    // var startTime = new Date().getTime();
    //
    // function mapAmimateLoop() {
    //     requestAnimationFrame(mapAmimateLoop);
    //     var c = new Date().getTime();
    //     if (c - startTime >= 400) {
    //         startTime = c;
    //         showMapAnimate();
    //     }
    // }
    //
    // function showMapAnimate() {
    //     var addr = mapAddrArr.pop();
    //     if (addr) {
    //         var _i = $('<i style="left: ' + addr.x + 'px;top: ' + addr.y + 'px" data-x="' + addr.x + '" data-y="' + addr.y + '"></i>');
    //         _map.append(_i);
    //         TweenMax.set(_i, {autoAlpha: 0, y: -10});
    //         TweenMax.to(_i, 0.8, {
    //             autoAlpha: range(2, 5),
    //             y: 0,
    //             ease: Elastic.easeOut.config(1, 0.3),
    //             onComplete: function () {
    //                 TweenMax.to(this.target, 0.8, {
    //                     delay: 3,
    //                     autoAlpha: 0,
    //                     ease: Power1.easeOut,
    //                     onComplete: function () {
    //                         var _target = $(this.target);
    //                         var x = _target.data('x');
    //                         var y = _target.data('y');
    //                         mapAddrArr.unshift({x: x, y: y});
    //                     },
    //                 });
    //             },
    //         });
    //     }
    // }
    //
    // mapAmimateLoop();

    var _addrs = $('.map i');

    _addrs = $.makeArray(_addrs).sort(function () {
        return Math.random() > 0.5 ? 1 : -1;
    });

    TweenMax.staggerTo(_addrs, 0.8, {
        startAt: {y: -10},
        y: 0,
        repeat: -1,
        repeatDelay: 4,
        ease: Elastic.easeOut.config(1, 0.3)
    }, 1);
})();
