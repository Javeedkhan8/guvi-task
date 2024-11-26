import React, { useEffect, useState } from 'react';
import { getMoviesDetails } from '../service/Api';
import { useParams } from 'react-router-dom';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMoviesDetails(id);
            setMovie(data);
        };
        fetchData();
    }, [id]);

    if (!movie) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4 bg-gray-950">
            <div className="container mx-auto bg-gray-800 p-4 rounded-lg flex gap-4">
                <img src={movie.Poster} alt={movie.Title} className="w-3/6 rounded-lg" />
                <div className='border-l-2 p-4 border-gray-500'>
                <h2 className="text-2xl font-bold text-blue-600 mb-8">{movie.Title}</h2>
                <div className="flex gap-4 flex-col font-medium text-gray-400">
                    <p>{movie.Year} Language: {movie.Language} {movie.Genre}</p>
                    <p className="uppercase">Director: {movie.Director}</p>

                    
                    <p>{movie.Plot}</p>
                    {/* Render Ratings if it's an array of objects */}
                    {movie.Ratings && Array.isArray(movie.Ratings) && (
                        <div>
                            {movie.Ratings.map((rating, index) => (
                                <p key={index}>
                                    {rating.Source}: {rating.Value} ⭐
                                </p>
                            ))}
                        </div>
                    )}
                    

                   
                    
                </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
