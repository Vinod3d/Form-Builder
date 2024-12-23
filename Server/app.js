import express from 'express'
import connectDB from './db/ConnectDB.js';
import { APP_PORT, JWT_KEY, MONGO_URI } from './config/Index.js';
import userRoutes from './routes/userRoutes.js'
import errorHandler from './middleware/errorHandlers.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = APP_PORT;

// middleware
app.use(express.json());
app.use(cookieParser(JWT_KEY))


// Api Routes
app.use('/api/user', userRoutes);


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