import * as Koa from 'koa';
import * as httpStatus from 'http-status-codes';
import RecordConfigController from '../controller/RecordConfigController';
import * as bodyParser from 'koa-bodyparser';

const app: Koa = new Koa();

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set("Access-Control-Allow-Headers", "Content-Type,Accept,X-Requested-With");
        ctx.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");

        await next();
    } catch (error) {
        ctx.status = error.statusCode || error.status || httpStatus.INTERNAL_SERVER_ERROR;
        error.status = ctx.status;
        ctx.body = { error };
        ctx.app.emit('error', error, ctx);
    }
});

// Enable bodyParser with default options
app.use(bodyParser());

// Route middleware.
app.use(RecordConfigController.routes());
app.use(RecordConfigController.allowedMethods);


// Application error logging.
app.on('error', console.error);

export default app;