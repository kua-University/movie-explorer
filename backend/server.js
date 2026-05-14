import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
