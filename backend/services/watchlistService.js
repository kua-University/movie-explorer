import { query } from '../config/db.js';

export const fetchWatchlistByUser = async (userId) => {
  const result = await query('SELECT * FROM watchlists WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  return result.rows;
};

export const addMovieToWatchlist = async (userId, movieData) => {
  const { id: movie_id, title, poster_path, release_date, vote_average } = movieData;

  // Check if already in watchlist
  const exists = await query('SELECT * FROM watchlists WHERE user_id = $1 AND movie_id = $2', [userId, movie_id]);
  if (exists.rows.length > 0) {
    throw new Error('Movie already in watchlist');
  }

  const newEntry = await query(
    'INSERT INTO watchlists (user_id, movie_id, title, poster_path, release_date, vote_average) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [userId, movie_id, title, poster_path, release_date, vote_average]
  );

  return newEntry.rows[0];
};

export const removeMovieFromWatchlist = async (userId, movieId) => {
  const result = await query('DELETE FROM watchlists WHERE user_id = $1 AND movie_id = $2 RETURNING *', [userId, movieId]);
  
  if (result.rows.length === 0) {
    throw new Error('Movie not found in watchlist');
  }

  return { id: movieId };
};
