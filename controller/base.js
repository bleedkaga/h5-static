module.exports = {
    async index(ctx, next) {
        await ctx.render('index', {title: '首页'});
    },
    async digitization(ctx, next) {
        await ctx.render('digitization', {title: '数字化零工'});
    },
};

