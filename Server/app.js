import express from 'express'
import connectDB from './db/ConnectDB.js';
import { APP_PORT, FRONTEND_URL, JWT_KEY, MONGO_URI } from './config/Index.js';
import userRoutes from './routes/userRoutes.js'
import workspaceRoutes from './routes/workspaceRoutes.js'
import errorHandler from './middleware/errorHandlers.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = APP_PORT;

// middleware
app.use(cors({
    origin: FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser(JWT_KEY))


// Api Routes
app.use('/api/user', userRoutes);
app.use('/api/workspace', workspaceRoutes);
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


// Health Check Route
app.get('/check', (req, res) => {
    res.send('app is running');
});

// Error Handling Middleware
app.use(errorHandler);

const start = async ()=>{
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}
start();