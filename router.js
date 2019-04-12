const router = require('koa-better-router')().loadMethods();
const path = require('path');

const controller = require('require-all')({
    dirname: path.join(__dirname, './controller'),
});

router.get('/index', controller.base.index);
router.get('/digitization', controller.base.digitization);

// 兜底
router.get('/*', (ctx, next) => {
    const ignorePath = [ctx.staticPath, '/favicon.ico'];
    if (ignorePath.some(p => ctx.url.indexOf(p) !== -1)) {
        return true;
    }
    ctx.redirect('/index');
});


module.exports = router;
