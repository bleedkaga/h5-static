require('@babel/register');

const Koa = require('koa');
const session = require('koa-session');
const path = require('path');
let router = require('./router');
const koaStatic = require('koa-static-server');
const koaBody = require('koa-body');
const views = require('koa-views');

const app = new Koa();

const RES_HOST = '/public';

const RES_PATH = path.join(process.cwd(), RES_HOST); //静态资源路径

app.context.staticPath = RES_HOST;

app.keys = [
    'dbRzJE9QCyDwGRbEREhMqllm5LmxCElcvy5HIN7lkncx9q6wA4r3DZwQ0vtJdKI11',
    'MKhhV5z037a9pYIhUl15VjcfBDzmS6Te2gec2CvV3J8axaecw4kcPM3NiRRwOa222',
    'Yh2DfewgSVuyqZUCO9zVJggEOk3Vayahj8G0Iog0wrIzjukKMUasVGXxZCBbZnQ33',
];

app.use(session({
    prefix: 'gsg-',
    key: 'goodsogood org compensation official pc',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
}, app));

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.error('10088', '解析请求参数失败', err);
        ctx.body = {code: 10088, message: '解析请求参数失败'};
        ctx.code = 444;
    }
});

app.use(koaBody({
    jsonLimit: '1mb', //JSON主体字节 1mb //application/json
    formLimit: '56kb', //表单主体字节 56kb //application/x-www-urlencoded
    textLimit: '56kb', //文本主体字节 56kb
    onError: (err, ctx) => {//eslint-disable-line
        console.log(err);
        throw err;
    },
    multipart: true, //
    formidable: {
        //multipart/form-data
        maxFields: 1000, //query 字符数 (0表示无限制)
        maxFieldsSize: 2 * 1024 * 1024, //默认单位内存量 2MB
        maxFileSize: 20 * 1024 * 1024, //限制上传文件的大小 20MB
        keepExtensions: true,
    },
}));

app.use(async (ctx, next) => {
    ctx.state = {
        staticPath: RES_HOST,
        pathname: ctx.url,
    };
    return next();
});

app.use(
    views(path.join(__dirname, './views'), {
        map: {
            html: 'ejs',
        },
        extension: 'html',
    })
);

app.use((ctx, next) => router.middleware()(ctx, next));

app.use((ctx, next) => {
    //如果路由中间件已经有数据了，无需再走静态文件中间件了
    if (ctx.body) {
        return true;
    }
    return next();
});

app.use(koaStatic({
    rootDir: RES_PATH,
    rootPath: RES_HOST,
}));

app.listen(3000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`dev服务已启动请等待编译完成 port:3000......`);
});



