import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use('/api/1.0', require('./app/routes/'));

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => { console.log('corriendo en el puerto', PORT) });
