const UserReducer = (state, action) => {
    switch (action.type) {
        case "SET_MOVIES":
            return {
                ...state,
                movies: action.payload, // Sets the list of movies
            };

        case "ADD_TO_FAVOURITE":
            // Avoid adding duplicates to favourites
            if (state.favourites.find((fav) => fav.imdbID === action.payload.imdbID)) {
                return state; // If movie is already in favourites, do nothing
            }
            return {
                ...state,
                favourites: [...state.favourites, action.payload], // Add new movie to favourites
            };

        case "REMOVE_FROM_FAVOURITE":
            return {
                ...state,
                favourites: state.favourites.filter((movie) => movie.imdbID !== action.payload.imdbID), // Remove from favourites by imdbID
            };

        case "SET_FILTER":
            return {
                ...state,
                filter: action.payload, // Updates the filter state (e.g. genre, year, rating)
            };

        default:
            return state;
    }
};

export default UserReducer;
