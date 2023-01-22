import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import { generate } from 'shortid';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

const infoImage: { path: string; name: string } = { path: '', name: '' };

export const uploadImg = async (req: Request, resp: Response, next: NextFunction): Promise<void> => {

    if (req.files === null || req.files === undefined) {

        resp.status(400).json({
            status: 400,
            messages: 'No se a seleccionado ninguna imagen',
            data: null
        });

        return;
    }

    const file = req.files.file as UploadedFile;
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

    const nameFile = `${name}-${generate()}.${ext}`;
    const uploads = path.resolve(__dirname, '../../../public');

    if (!fs.existsSync(uploads)) fs.mkdirSync('dist/public', { recursive: true });

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

        infoImage.path = pathImageCurrent;
        infoImage.name = name;
        next();
    });
}

export const saveCloudinary = async (req: Request, resp: Response): Promise<void> => {

    try {

        const result = await cloudinary.uploader.upload(infoImage.path);

        const data = {
            url: result.url,
            id: result.public_id,
            nameFile: infoImage.name,
        }

        resp.status(200).json({
            status: 200,
            messages: 'Imagen cargada con exito',
            data
        });

    } catch(err) {

        console.log(err);

        resp.status(200).json({
            status: 500,
            messages: 'Ocurrio un error',
            data: null
        });
    }
}