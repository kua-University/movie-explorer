import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const { data } = await axios.get('/api/watchlist');
                const mappedData = data.map(m => ({...m, id: m.movie_id, db_id: m.id}));
                setWatchlist(mappedData);
            } catch (err) {
                console.error("Error fetching watchlist", err);
            }
        };

        if (user) {
            fetchWatchlist();
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setWatchlist([]);
        }
    }, [user]);

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
            toast.success("Added to watchlist");
        } catch (err) {
            console.error("Error adding to watchlist", err);
            toast.error("Failed to add to watchlist");
        }
    };

    const removeFromWatchlist = async (movieId) => {
        try {
            await axios.delete(`/api/watchlist/${movieId}`);
            setWatchlist(prev => prev.filter((m) => m.id !== movieId));
            toast.success("Removed from watchlist");
        } catch (err) {
            console.error("Error removing from watchlist", err);
            toast.error("Failed to remove from watchlist");
        }
    };

    const isInWatchlist = (movieId) => watchlist.some((m) => m.id === movieId);

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWatchlistContext() {
    return useContext(WatchlistContext);
}
