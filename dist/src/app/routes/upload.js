"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../controllers/upload");
const router = (0, express_1.Router)();
router.post('/upload-img', upload_1.uploadImg);
module.exports = router;
