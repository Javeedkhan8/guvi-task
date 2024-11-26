const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "b2fc990d";

// Function to get movies by search query
export const getMovies = async (query) => {
    try {
        const response = await fetch(
            `${BASE_URL}?s=${query}&apikey=${API_KEY}`
        );
        
        // Check for a successful response
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Handle if no movies are found
        if (data.Response === 'False') {
            throw new Error('No movies found for this query.');
        }

        return data.Search; // `Search` contains the list of movies
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error; // Re-throw the error for the caller to handle
    }
};

// Function to get movie details by IMDb ID
export const getMoviesDetails = async (id) => {
    try {
        const response = await fetch(
            `${BASE_URL}?i=${id}&apikey=${API_KEY}`
        );

        // Check for a successful response
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Handle case where no movie details are found
        if (data.Response === 'False') {
            throw new Error(`No details found for movie ID: ${id}`);
        }

        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error; // Re-throw the error for the caller to handle
    }
};
