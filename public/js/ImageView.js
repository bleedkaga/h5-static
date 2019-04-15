/**
 * Created by wmz on 2015/7/8.
 *
 */
(function () {
    window.SCALE_TYPE = {
        DEFAULT: 0, //默认不做任何调整
        CENTER: 1, //图片不缩放填充，水平/垂直居中

        CENTER_INSIDE_LONG: 2, //图片比容器大根据最长边等比缩放；图片比容器小就不缩放，水平/垂直居中
        CENTER_CROP_LONG: 3, //图片比容器大就不缩放；图片比容器小根据最长边等比缩放，水平/垂直居中
        FIT_CENTER_LONG: 4, //图片等比缩放填充，水平/垂直居中，根据最长边缩放
        FIT_TOP_LONG: 5, //图片等比缩放填充，向上居中，根据最长边缩放
        FIT_DOWN_LONG: 6, //图片等比缩放填充，向下居中，根据最长边缩放
        FIT_LEFT_LONG: 7, //图片等比缩放填充，向左居中，根据最长边缩放
        FIT_RIGHT_LONG: 8, //图片等比缩放填充，向右居中，根据最长边缩放
        FIT_XY_LONG: 9,//图片等比缩放填充，自定义居中，根据最长边缩放

        CENTER_INSIDE_SHORT: 10, //图片比容器大根据最短边等比缩放；图片比容器小就不缩放，水平/垂直居中
        CENTER_CROP_SHORT: 11, //图片比容器大就不缩放；图片比容器小根据最短边等比缩放，水平/垂直居中
        FIT_CENTER_SHORT: 12,//图片等比缩放填充，水平/垂直居中，根据最短边缩放（默认）
        FIT_TOP_SHORT: 13, //图片等比缩放填充，向上居中，根据最短边缩放
        FIT_DOWN_SHORT: 14, //图片等比缩放填充，向下居中，根据最短边缩放
        FIT_LEFT_SHORT: 15, //图片等比缩放填充，向左居中，根据最短边缩放
        FIT_RIGHT_SHORT: 16, //图片等比缩放填充，向右居中，根据最短边缩放
        FIT_XY_SHORT: 17 //图片等比缩放填充，自定义居中，根据最短边缩放
    };

    window.ImageView = {
        _images: [],
        x: 0,
        y: 0,
        containerSelect: "",
        ScaleType: SCALE_TYPE.FIT_CENTER_SHORT, //全局拉伸类型
        init: function (select, opts) {
            opts = opts || {};
            var image, $image, $container;
            if (select instanceof Image || select instanceof HTMLImageElement) {
                image = select;
            } else if (window.jQuery && select instanceof window.jQuery) {
                image = select.get(0);
                $image = select.eq(0);
            }

            if (!image) {
                return (console.error("传入的 " + select + " 不是一个有效的识别对象！"));
            }

            !$image && ($image = $(image));
            var containerSelect = opts.containerSelect || ImageView.containerSelect;
            $container = containerSelect ? $image.parents(containerSelect) : $image.parent();
            var index = ImageView._images.push({
                image: image,
                jqImage: $image,
                jqContainer: $container,
                callback: opts.callback
            });
            imageComplete(index - 1, function (index) {
                var obj = ImageView._images[index];
                var image = obj.image;
                var $image = $(image);
                var $container = obj.jqContainer;
                scaleImage(image, $container.data("iv-scale-type"), obj.callback, $image, $container);
            });
        },
        reset: function () {
            var arr = ImageView._images;
            for (var i = 0, l = arr.length; i < l; i++) {
                imageComplete(i, function (index) {
                    var obj = ImageView._images[index];
                    var image = obj.image;
                    var $image = $(image);
                    var $container = obj.jqContainer;
                    scaleImage(image, $container.data("iv-scale-type"), obj.callback, $image, $container);
                });
            }
        }
    };

    function imageComplete(index, cb) {
        var obj = ImageView._images[index];
        var image = obj.image;
        if (image.complete) {
            cb(index);
        } else {
            var img = new Image();
            img.onload = function () {
                cb(index);
            };
            img.src = image.src;
        }
    }

    function scaleImage(image, scaleType, callback, $image, $container) {
        if (!image) return false;
        scaleType = scaleType === undefined ? ImageView.ScaleType : scaleType;
        var number = parseInt(scaleType, 10);
        if (isNaN(number)) {
            scaleType = SCALE_TYPE[scaleType.toString().toUpperCase()];
        } else {
            scaleType = number;
        }
        if (scaleType != SCALE_TYPE.DEFAULT){
            $image = $image || $(image);
            $container = $container || $image.parent();

            var cw = $container.width();
            var ch = $container.height();
            $image.css({margin: 0, display: "block", "max-height": "none", "max-width": "none"});
            var imagePos = $image.css("position");
            var cssX = "marginLeft";
            var cssY = "marginTop";
            if (imagePos == "absolute") {
                cssX = "left";
                cssY = "top";
                cw = $container.outerWidth();
                ch = $container.outerHeight();
                $image.css({top: 0, left: 0, right: "auto", bottom: "auto"});
            }
            scale($image, $container, cw, ch, cssX, cssY, scaleType);
        }

        callback && callback(image, $image, $container);
    }

    function scale($image, $container, maxW, maxH, cssX, cssY, scaleType) {
        var image = $image.get(0);
        var w = image.width;
        var h = image.height;
        var wh, position;
        switch (scaleType) {
            //图片比容器大根据最长边等比缩放；图片比容器小就不缩放，水平/垂直居中
            case SCALE_TYPE.CENTER_INSIDE_LONG:
                wh = ratio(w, h, maxW, maxH, "INSIDE", "LONG");
                position = pos(wh.w, wh.h, maxW, maxH, "center");
                break;
            //图片比容器大就不缩放；图片比容器小根据最长边等比缩放，水平/垂直居中
            case SCALE_TYPE.CENTER_CROP_LONG:
                wh = ratio(w, h, maxW, maxH, "CROP", "LONG");
                position = pos(wh.w, wh.h, maxW, maxH, "center");
                break;
            //图片等比缩放填充，水平/垂直居中，根据最长边缩放
            case SCALE_TYPE.FIT_CENTER_LONG:
                wh = ratio(w, h, maxW, maxH, "OTHER", "LONG");
                position = pos(wh.w, wh.h, maxW, maxH, "center");
                break;
            //图片等比缩放填充，向上居中，根据最长边缩放
            case SCALE_TYPE.FIT_TOP_LONG:
                wh = ratio(w, h, maxW, maxH, "OTHER", "LONG");
                position = pos(wh.w, wh.h, maxW, maxH, "top");
                break;
            //图片等比缩放填充，向下居中，根据最长边缩放
            case SCALE_TYPE.FIT_DOWN_LONG:
                wh = ratio(w, h, maxW, maxH, "OTHER", "LONG");
                position = pos(wh.w, wh.h, maxW, maxH, "down");
                break;
            //图片等比缩放填充，向左居中，根据最长边缩放
            case SCALE_TYPE.FIT_LEFT_LONG:
                wh = ratio(w, h, maxW, maxH, "OTHER", "LONG");
                position = pos(wh.w, wh.h, maxW, maxH, "left");
                break;
            //图片等比缩放填充，向右居中，根据最长边缩放
            case SCALE_TYPE.FIT_RIGHT_LONG:
                wh = ratio(w, h, maxW, maxH, "OTHER", "LONG");
                position = pos(wh.w, wh.h, maxW, maxH, "right");
                break;
            //图片等比缩放填充，自定义居中，根据最长边缩放
            case SCALE_TYPE.FIT_XY_LONG:
                wh = ratio(w, h, maxW, maxH, "OTHER", "LONG");
                position = {x: $container.data("iv-x") || ImageView.x, y: $container.data("iv-y") || ImageView.y};
                break;
            //图片比容器大就不缩放；图片比容器小根据最短边等比缩放，水平/垂直居中
            case SCALE_TYPE.CENTER_CROP_SHORT:
                wh = ratio(w, h, maxW, maxH, "CROP", "SHORT");
                position = pos(wh.w, wh.h, maxW, maxH, "center");
                break;
            //图片比容器大根据最短边等比缩放；图片比容器小就不缩放，水平/垂直居中
            case SCALE_TYPE.CENTER_INSIDE_SHORT:
                wh = ratio(w, h, maxW, maxH, "INSIDE", "SHORT");
                position = pos(wh.w, wh.h, maxW, maxH, "center");
                break;
            //图片等比缩放填充，水平/垂直居中，根据最短边缩放（默认）
            case SCALE_TYPE.FIT_CENTER_SHORT:
                wh = ratio(w, h, maxW, maxH, "OTHER", "SHORT");
                position = pos(wh.w, wh.h, maxW, maxH, "center");
                break;
            //图片等比缩放填充，向上居中，根据最短边缩放
            case SCALE_TYPE.FIT_TOP_SHORT:
                wh = ratio(w, h, maxW, maxH, "OTHER", "SHORT");
                position = pos(wh.w, wh.h, maxW, maxH, "top");
                break;
            //图片等比缩放填充，向下居中，根据最短边缩放
            case SCALE_TYPE.FIT_DOWN_SHORT:
                wh = ratio(w, h, maxW, maxH, "OTHER", "SHORT");
                position = pos(wh.w, wh.h, maxW, maxH, "down");
                break;
            //图片等比缩放填充，向左居中，根据最短边缩放
            case SCALE_TYPE.FIT_LEFT_SHORT:
                wh = ratio(w, h, maxW, maxH, "OTHER", "SHORT");
                position = pos(wh.w, wh.h, maxW, maxH, "left");
                break;
            //图片等比缩放填充，向右居中，根据最短边缩放
            case SCALE_TYPE.FIT_RIGHT_SHORT:
                wh = ratio(w, h, maxW, maxH, "OTHER", "SHORT");
                position = pos(wh.w, wh.h, maxW, maxH, "right");
                break;
            //图片等比缩放填充，自定义居中，根据最短边缩放
            case SCALE_TYPE.FIT_XY_SHORT:
                wh = ratio(w, h, maxW, maxH, "OTHER", "SHORT");
                position = {x: $container.data("iv-x") || ImageView.x, y: $container.data("iv-y") || ImageView.y};
                break;
            case SCALE_TYPE.CENTER:
                wh = {w: w, h: h};
                position = pos(wh.w, wh.h, maxW, maxH, "center");
        }

        var css = {width: wh.w, height: wh.h};
        css[cssX] = position.x;
        css[cssY] = position.y;
        $image.css(css);
    }

    function ratio(w, h, maxW, maxH, sideType, way) {
        sideType = sideType || "";
        way = way || "";
        if (sideType == "INSIDE" && (w <= maxW && h <= maxH)) {
            return {w: w, h: h}
        } else if (sideType == "CROP" && (w >= maxW && h >= maxH)) {
            return {w: w, h: h}
        } else {

            var a = w / maxW;
            var b = h / maxH;

            if (way == "LONG") {
                //长边
                if (b > a) a = b;
            } else {

                if (b < a) a = b;

            }


            return {w: w / a, h: h / a}
        }
    }

    function pos(w, h, maxW, maxH, direction) {
        var posX = 0, posY = 0;
        switch (direction) {
            case "center":
                posX = (maxW - w) / 2;
                posY = (maxH - h) / 2;
                break;
            case "top":
                posX = (maxW - w) / 2;
                posY = 0;
                break;
            case "down":
                posX = (maxW - w) / 2;
                posY = maxH - h;
                break;
            case "left":
                posX = 0;
                posY = (maxH - h) / 2;
                break;
            case "right":
                posX = maxW - w;
                posY = (maxH - h) / 2;
                break;
        }
        return {x: posX, y: posY}
    }

})();
