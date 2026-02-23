
import { useParams, Link, Routes, Route } from 'react-router-dom';
import MovieForm from './MovieForm';
import MovieCard from './MovieCard';

function DirectorCard({ directors, setDirectors }) {
    const { id } = useParams()
    const director = directors.find(d => d.id === id)

    if (!director) {
        return <h2>Director not found.</h2>
    }

    const updateDirector = (updatedDirector) => {
        setDirectors(directors.map(d => d.id === updatedDirector.id ? updatedDirector : d))
    }

    return (
        <div>
            <h2>{director.name}</h2>
            <p>{director.bio}</p>
            <h3>Movies:</h3>
            <ul>
                {director.movies.map((movie) => (
                <li key={movie.id}>
                    <Link to={`movies/${movie.id}`}>{movie.title}</Link>
                </li>
                ))}
            </ul>
            <Link to={`movies/new`}>Add New Movie</Link>
            <Routes>
                <Route path="movies/new" element={<MovieForm director={director} updateDirector={updateDirector} />} />
                <Route path="movies/:movieId" element={<MovieCard director={director} />} />
            </Routes>
        </div>
    )
}

export default DirectorCard
