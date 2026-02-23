import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const DirectorContainer = () => {
    const [directors, setDirectors] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/directors")
        .then(r => {
            if (!r.ok) { throw new Error("failed to fetch directors") }
            return r.json()
        })
        .then(setDirectors)
        .catch(console.log)
    }, [])

    const addDirector = (newDirector) => {
        setDirectors([...directors, newDirector])
    }

    const updateDirector = (updatedDirector) => {
        setDirectors(directors.map(d => d.id === updatedDirector.id ? updatedDirector : d))
    }

    return (
        <>
            <NavBar />
            <main>
                <Outlet context={{ directors, addDirector, updateDirector }} />
            </main>
        </>
    );
}

export default DirectorContainer;
