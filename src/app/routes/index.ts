import { Router } from "express";
import fs from 'fs';

const router = Router();
const pathRouter = `${__dirname}`;

const removeExtension = (fileName: string): string => {

    return fileName.split('.').shift() ?? '';
}

fs.readdirSync(pathRouter).filter(file => {

    const fileWithOutExt = removeExtension(file);
    const skip = ['index'].includes(fileWithOutExt);

    if (!skip) {
        router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`));
    }
});

router.get('*', (req, resp) => {

    resp.status(404);
    // resp.send({ error: 'Not Found' });
    resp.json({
        status: 500,
        message: 'Not found',
        data: null,
    });
});

module.exports = router;