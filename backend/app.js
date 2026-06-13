import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './db/db.js';
import router from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.get('/', (req, res) => {
    res.send('Hello from the server');
});

await db();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});