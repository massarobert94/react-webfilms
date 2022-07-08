import React from 'react';
import { useState, useEffect } from 'react';

import './App.css';
import searchIcon from './search.svg';
import Card from './Card.jsx';

const api_url = ' http://www.omdbapi.com/?i=tt3896198&apikey=1caa1a0b';

const movie1 = {
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzE1Njk0NmItNDhlMC00ZmFlLWI4ZTUtYTY4ZjgzNjkyMTU1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    "Title": "Clerks",
    "Type": "movie",
    "Year": "1994",
    "imdbID": "tt0109445"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearch] = useState('');

    useEffect(() => {
        search('Clerks');
    }, []);

    const search = async (movieTitle) => {
        const results = await fetch(`${api_url}&s=${movieTitle}`);
        const resultsData = await results.json();
        setMovies(resultsData.Search);
    };

    return (
        <div className="app">
            <h1>Webfilms</h1>

            <div className="search">
                <input 
                placeholder="Search for your movie here" value={searchTerm}
                onChange={(e) => {
                    setSearch(e.target.value);
                }
                }
                />
                <img 
                src={searchIcon}
                alt="search here"
                onClick={() => search(searchTerm)}
                />
            </div>
            {
                movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => <Card movie={movie} /> )}
                    </div>
                ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
                )
            }
            
        </div>
        
    )
}

export default App;