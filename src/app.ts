import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import sharp from 'sharp';

dotenv.config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();

        cb(null, `${Date.now()}.${ext}`)
    }
});

export const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/1.0', require('./app/routes/'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('corriendo en el puerto', PORT));