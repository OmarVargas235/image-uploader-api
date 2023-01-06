import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use('/api/1.0', require('./app/routes/'));

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => { console.log('corriendo en el puerto', PORT) });
