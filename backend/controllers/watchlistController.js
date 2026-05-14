import { query } from '../config/db.js';

export const getWatchlist = async (req, res) => {
  try {
    const result = await query('SELECT * FROM watchlists WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addToWatchlist = async (req, res) => {
  const { id: movie_id, title, poster_path, release_date, vote_average } = req.body;

  if (!movie_id || !title) {
    return res.status(400).json({ message: 'Please provide movie details' });
  }

  try {
    // Check if already in watchlist
    const exists = await query('SELECT * FROM watchlists WHERE user_id = $1 AND movie_id = $2', [req.user.id, movie_id]);
    if (exists.rows.length > 0) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    const newEntry = await query(
      'INSERT INTO watchlists (user_id, movie_id, title, poster_path, release_date, vote_average) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [req.user.id, movie_id, title, poster_path, release_date, vote_average]
    );

    res.status(201).json(newEntry.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeFromWatchlist = async (req, res) => {
  const movie_id = req.params.id;

  try {
    const result = await query('DELETE FROM watchlists WHERE user_id = $1 AND movie_id = $2 RETURNING *', [req.user.id, movie_id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Movie not found in watchlist' });
    }

    res.json({ id: movie_id, message: 'Movie removed from watchlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
