import { Router } from 'express';

import { uploadImg, saveCloudinary } from '../controllers/upload';

const router = Router();

router.post('/upload-img', uploadImg, saveCloudinary);

module.exports = router;