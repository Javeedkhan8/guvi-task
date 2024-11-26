import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import { MoviesProvider } from './context/Moviecontext'
import Searchpage from './pages/SearchPage'
import MovieDetails from './pages/MovieDetails'
import FavouritesPages from './pages/FavouritesPages'
function App() {
 
  return (
    <div>
     <MoviesProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path = "/" element = {<Searchpage/>}/>
          <Route path = "/movie/:id" element ={<MovieDetails/>}/>
          <Route path = "/favourite" element = {<FavouritesPages/>}/>
        </Routes>
      </Router>
     </MoviesProvider>
    </div>
  )
}

export default App
