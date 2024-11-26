import { createContext } from "react";
import { useReducer,useContext } from "react";
import UserReducer from "./UserReducer"

const Moviecontext = createContext();

export const MoviesProvider = ({children}) => {
    const initialstate = {
    movies:[],
    favourites:[],
    filter:[],
    }

    const [state,dispatch] = useReducer(UserReducer,initialstate)

    return (
        <Moviecontext.Provider value={{state,dispatch}}>
            {children}
        </Moviecontext.Provider>
    )
}
export const useMoviecontext = () => useContext(Moviecontext)