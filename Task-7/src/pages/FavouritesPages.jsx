import React, { useState } from 'react';
import { useMoviecontext } from '../context/Moviecontext';
import MovieCart from '../components/MovieCart';
import Pagination from '../components/Pagination';

function FavouritesPages() {
    const { state } = useMoviecontext();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    if (state.favourites.length === 0) {
        return <h2 className="text-2xl font-bold">No Favourite Movie added</h2>;
    }

    const totalPages = Math.ceil(state.favourites.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFavourites = state.favourites.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4">
                    {currentFavourites.map((movie) => (
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

export default FavouritesPages;
