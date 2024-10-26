import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import cookieParser from 'cookie-parser';
import middleware from 'i18next-http-middleware';
import * as env from 'dotenv';
import clientRouter from './router/client.js';
import testRouter from './router/admin/test.js';
import userRouter from './router/admin/user.js';
import roleRouter from './router/admin/role.js';
import teamRouter from './router/admin/team.js';
import errorMiddleware from './middlewares/error-middleware.js';

env.config();
mongoose.set('strictQuery', false);

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}.json',
    },
  });

const PORT = process.env.PORT || 5000;
const app = express();
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.PHONE_URL
];

app.use(middleware.handle(i18next));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);
app.use('/api/test', testRouter);
app.use('/api/user', userRouter);
app.use('/api/role', roleRouter);
app.use('/api/team', teamRouter);
app.use('/api', clientRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`[OK] Server is running on PORT = ${PORT}`);
    });

    mongoose
      .connect(process.env.BD_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('[OK] DB is connected'))
      .catch((err) => console.error(err));
  } catch (e) {
    console.log(e);
  }
};
start();
