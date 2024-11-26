import React, { useState, useEffect } from 'react';
import { useMoviecontext } from '../context/Moviecontext';
import { getMovies } from '../service/Api';
import MovieCart from '../components/MovieCart';
import Pagination from '../components/Pagination';

function SearchPage() {
    const { state, dispatch } = useMoviecontext();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        if (query) {
            handleSearch();
        }
    }, [query, currentPage]);

    const handleSearch = async () => {
        if (!query) return;

        setLoading(true);
        setError('');

        try {
            const data = await getMovies(query);
            dispatch({ type: 'SET_MOVIES', payload: data });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(state.movies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentMovies = state.movies.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-4 bg-gray-950">
            <div className="container mx-auto">
                <div className="mb-4 flex gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Search Movies or Shows"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-80 px-4 py-2 mb-4 bg-gray-600 rounded-lg"
                    />
                    <button onClick={handleSearch} className="bg-gray-600 text-gray-300 px-4 py-2 mb-4 rounded-lg">
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>

                {/* Display error if any */}
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {currentMovies.map((movie) => (
                        <MovieCart key={movie.imdbID} movie={movie} />
                    ))}
                </div>

                {/* Carousel Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default SearchPage;
