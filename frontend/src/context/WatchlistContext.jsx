import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchWatchlist();
        } else {
            setWatchlist([]);
        }
    }, [user]);

    const fetchWatchlist = async () => {
        try {
            const { data } = await axios.get('/api/watchlist');
            // ensure the structure matches what components expect (movie_id -> id mapping if needed)
            const mappedData = data.map(m => ({...m, id: m.movie_id, db_id: m.id}));
            setWatchlist(mappedData);
        } catch (err) {
            console.error("Error fetching watchlist", err);
        }
    };

    const addToWatchlist = async (movie) => {
        if (watchlist.some(m => m.id === movie.id)) return;
        
        try {
            const { data } = await axios.post('/api/watchlist', {
                id: movie.id,
                title: movie.title || movie.name,
                poster_path: movie.poster_path,
                release_date: movie.release_date || movie.first_air_date,
                vote_average: movie.vote_average
            });
            const mappedEntry = {...data, id: data.movie_id, db_id: data.id};
            setWatchlist(prev => [...prev, mappedEntry]);
        } catch (err) {
            console.error("Error adding to watchlist", err);
        }
    };

    const removeFromWatchlist = async (movieId) => {
        try {
            await axios.delete(`/api/watchlist/${movieId}`);
            setWatchlist(prev => prev.filter((m) => m.id !== movieId));
        } catch (err) {
            console.error("Error removing from watchlist", err);
        }
    };

    const isInWatchlist = (movieId) => watchlist.some((m) => m.id === movieId);

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
}

export function useWatchlistContext() {
    return useContext(WatchlistContext);
}
