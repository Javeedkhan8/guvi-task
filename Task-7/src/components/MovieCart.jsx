import React from 'react';
import { Link } from 'react-router-dom';
import { useMoviecontext } from '../context/Moviecontext';


function MovieCart({ movie }) {
    const {state, dispatch } = useMoviecontext();

    const isFavourite = state.favourites.some((fav) => fav.imdbID === movie.imdbID);

    const toggleFavourite = () => {
      if(isFavourite){
        dispatch({
          type:"REMOVE_FROM_FAVOURITE",
          payload:movie
        });
      }
      else{
        dispatch({
          type:"ADD_TO_FAVOURITE",
          payload:movie,
        })
      }
    }
    

    return (
        <div className='shadow-lg bg-gray-800 flex flex-col p-2 hover:scale-105'>
            <img src={movie.Poster} alt={movie.Title} className='w-full h-full rounded-t-lg object-cover' />
            <div className='flex flex-col text-gray-400 p-2 gap-2'>
                <h2 className='text-lg font-medium'>{movie.Title}</h2>
                <p className='text-sm'>{movie.Year}</p>
                <span className='flex justify-between items-center'>
                    <Link to={`/movie/${movie.imdbID}`} className='text-blue-800 font-medium px-1 py-1 hover:underline'>
                        Details
                    </Link>
                    <button
                        onClick={toggleFavourite}
                        className={`mt-2 py-1 px-4 rounded-lg ${
                            isFavourite ? 'hover:scale-110' : 'hover:underline'
                        }`}
                    >
                        {isFavourite ? '✖' : 'Favourite'}
                    </button>
              
                </span>
            </div>
        </div>
    );
}

export default MovieCart;
