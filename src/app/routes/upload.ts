import { Router } from "express";

import { uploadImg } from '../controllers/upload';

import { upload } from '../../app';

const router = Router();

router.post('/upload-img', upload.single('image'), uploadImg);

module.exports = router;