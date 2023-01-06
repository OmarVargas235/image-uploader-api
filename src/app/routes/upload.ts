import { Router } from 'express';

import { uploadImg } from '../controllers/upload';

const router = Router();

router.post('/upload-img', uploadImg);

module.exports = router;