import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './db/db.js';
import router from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.get('/', (req, res) => {
    res.send('Hello from the server');
});

const startServer = async () => {
    try {
        await db();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}....`);
        });
    } catch (error) {
        console.log('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();