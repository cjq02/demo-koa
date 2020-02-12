import * as Koa from 'koa';
import * as Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import RecordConfigEntity from '../entity/RecordConfigEntity';
import * as HttpStatus from 'http-status-codes';
import Constants from '../common/Constants';

const routerOpts: Router.IRouterOptions = {
    prefix: '/recordConfig',
};

const router: Router = new Router(routerOpts);

router.get('/list', async (ctx: Koa.Context) => {
    // Get the recordConfig repository from TypeORM.
    const recordConfigRepo: Repository<RecordConfigEntity> = getRepository(RecordConfigEntity);

    // Find the requested recordConfig.
    const list = await recordConfigRepo.find();

    // Respond with our recordConfig data.
    ctx.body = {
        data: { recordConfigs: list },
    };
});

router.get('/:recordConfigId', async (ctx) => {
    // Get the recordConfig repository from TypeORM.
    const recordConfigRepo: Repository<RecordConfigEntity> = getRepository(RecordConfigEntity);

    // Find the requested recordConfig.
    const recordConfig = await recordConfigRepo.findOne(ctx.params.recordConfig_id);

    // If the recordConfig doesn't exist, then throw a 404.
    // This will be handled upstream by our custom error middleware.
    if (!recordConfig) {
        ctx.throw(HttpStatus.NOT_FOUND);
    }

    // Respond with our recordConfig data.
    ctx.body = {
        data: { recordConfig },
    };
});

router.post('/save', async (ctx: Koa.Context) => {
    // Get the recordConfig repository from TypeORM.
    const recordConfigRepo: Repository<RecordConfigEntity> = getRepository(RecordConfigEntity);
    const requestEntity: RecordConfigEntity = ctx.request.body;

    // Create our new recordConfig.
    let entity: RecordConfigEntity = recordConfigRepo.create(requestEntity);
    entity.createAt = new Date();
    entity.createUserId = Constants.openId;

    // Persist it to the database.
    await recordConfigRepo.save(entity);

    // Set the status to 201.

    // Respond with our recordConfig data.ctx.status = HttpStatus.CREATED;
    ctx.body = {
        data: { recordConfig: entity },
    };
});

router.delete('/:recordConfigId', async (ctx: Koa.Context) => {
    // Get the recordConfig repository from TypeORM.
    const recordConfigRepo: Repository<RecordConfigEntity> = getRepository(RecordConfigEntity);

    // Find the requested recordConfig.
    const recordConfig = await recordConfigRepo.findOne(ctx.params.recordConfig_id);

    // If the recordConfig doesn't exist, then throw a 404.
    // This will be handled upstream by our custom error middleware.
    if (!recordConfig) {
        ctx.throw(HttpStatus.NOT_FOUND);
    }

    // Delete our recordConfig.
    await recordConfigRepo.delete(recordConfig);

    // Respond with no data, but make sure we have a 204 response code.
    ctx.status = HttpStatus.NO_CONTENT;
});

router.patch('/:recordConfigId', async (ctx: Koa.Context) => {
    // Get the recordConfig repository from TypeORM.
    const recordConfigRepo: Repository<RecordConfigEntity> = getRepository(RecordConfigEntity);

    // Find the requested recordConfig.
    const recordConfig: RecordConfigEntity = await recordConfigRepo.findOne(ctx.params.recordConfig_id);

    // If the recordConfig doesn't exist, then throw a 404.
    // This will be handled upstream by our custom error middleware.
    if (!recordConfig) {
        ctx.throw(HttpStatus.NOT_FOUND);
    }

    // Merge the existing recordConfig with the new data.
    // This allows for really simple partial (PATCH).
    const updatedrecordConfig = await recordConfigRepo.merge(recordConfig, ctx.request.body);

    // Save the new data.
    recordConfigRepo.save(updatedrecordConfig);


    // Respond with our recordConfig data.// Response with the updated content.
    ctx.body = {
        data: { recordConfig: updatedrecordConfig },
    };
});

export default router;