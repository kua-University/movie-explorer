import express from 'express';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../controllers/watchlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getWatchlist)
  .post(protect, addToWatchlist);

router.route('/:id')
  .delete(protect, removeFromWatchlist);

export default router;
