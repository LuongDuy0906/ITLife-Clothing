import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';

// App Config
const app = express();
const PORT = process.env.PORT || 5001;

connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Api endpoint
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(PORT, () => {
  console.log('Server started on port:', PORT);
});
