module.exports = {
    async index(ctx, next) {
        await ctx.render('index', {title: '首页'});
    },
    async digitization(ctx, next) {
        await ctx.render('digitization', {title: '数字化零工'});
    },

    async labor(ctx, next) {
        await ctx.render('labor', {title: '按需用工'});
    },

    async recommend(ctx, next) {
        await ctx.render('recommend', {title: '应用介绍'});
    },

    async about(ctx, next) {
        await ctx.render('about', {title: '关于我们'});
    },
};

