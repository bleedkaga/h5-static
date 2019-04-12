(function () {
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
    })
})();
