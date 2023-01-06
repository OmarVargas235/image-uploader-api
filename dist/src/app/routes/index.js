"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
const pathRouter = `${__dirname}`;
const removeExtension = (fileName) => {
    var _a;
    return (_a = fileName.split('.').shift()) !== null && _a !== void 0 ? _a : '';
};
fs_1.default.readdirSync(pathRouter).filter(file => {
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
