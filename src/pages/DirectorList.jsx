
import { Link } from 'react-router-dom';

const DirectorList = ({ directors }) => {
    const displayDirectors = directors.map(d => (
        <li key={d.id}>
            <Link to={`${d.id}`}>{d.name}</Link>
        </li>
    ))

    return (
        <>
            <h1>Welcome to the Director's Directory!</h1>
            <Link to="new">Add New Director</Link>
            <ul>
                {displayDirectors}
            </ul>
        </>
    );
}

export default DirectorList;
