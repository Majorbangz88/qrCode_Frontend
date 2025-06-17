import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MoviesPage() {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        console.log(`Fetching from: ${backendUrl}/api/movies/${id}`);
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/movies/${id}`);

                console.log('Response status:', response.status);

                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, [id]);

    return (
        <div className="movies-container">
            <h1>10 Random Movies</h1>
            <div className="movies-grid">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.Title} className="movie-card">
                            <h2>{movie.Title}</h2>
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x450?text=Poster+Not+Available';
                                }}
                            />
                        </div>
                    ))
                ) : (
                    <p>Loading movies...</p>
                )}
            </div>
        </div>
    );
}