"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImg = void 0;
const shortid_1 = require("shortid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadImg = (req, resp) => {
    if (req.files == null) {
        resp.status(400).json({
            status: 400,
            messages: 'No se a seleccionado ninguna imagen',
            data: null
        });
        return;
    }
    const file = req.files.file;
    const name = file.name.split('.')[0];
    const ext = file.name.split('.')[1];
    const isValidExtension = !['png', 'jpg', 'jpeg', 'webp'].includes(ext);
    if (isValidExtension) {
        resp.status(400).json({
            status: 400,
            messages: 'Extensión no permitida',
            data: ['png', 'jpg', 'jpeg', 'webp']
        });
        return;
    }
    const nameFile = `${name}-${(0, shortid_1.generate)()}.${ext}`;
    const uploads = path_1.default.resolve(__dirname, '../../../public');
    if (!fs_1.default.existsSync(uploads))
        fs_1.default.mkdirSync('dist/public', { recursive: true });
    const pathImageCurrent = `${uploads}/${nameFile}`;
    file.mv(pathImageCurrent, function (err) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (err) {
            return resp.status(500).json({
                status: 500,
                messages: null,
                data: err
            });
        }
        resp.status(200).json({
            status: 200,
            messages: 'Imagen cargada con exito',
            data: null
        });
    });
};
exports.uploadImg = uploadImg;
