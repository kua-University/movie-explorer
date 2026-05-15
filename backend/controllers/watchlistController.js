import * as watchlistService from '../services/watchlistService.js';

export const getWatchlist = async (req, res) => {
  try {
    const watchlist = await watchlistService.fetchWatchlistByUser(req.user.id);
    res.json(watchlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addToWatchlist = async (req, res) => {
  try {
    const newEntry = await watchlistService.addMovieToWatchlist(req.user.id, req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    if (error.message === 'Please provide movie details') {
      res.status(400).json({ message: error.message });
    } else if (error.message === 'Movie already in watchlist') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    const result = await watchlistService.removeMovieFromWatchlist(req.user.id, req.params.id);
    res.json({ id: result.id, message: 'Movie removed from watchlist' });
  } catch (error) {
    console.error(error);
    if (error.message === 'Movie not found in watchlist') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};
