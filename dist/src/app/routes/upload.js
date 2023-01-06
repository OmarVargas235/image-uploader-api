"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../controllers/upload");
const app_1 = require("../../app");
const router = (0, express_1.Router)();
router.post('/upload-img', app_1.upload.single('image'), upload_1.uploadImg);
module.exports = router;
