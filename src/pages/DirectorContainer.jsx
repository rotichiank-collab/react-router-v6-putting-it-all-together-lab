import { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import DirectorList from './DirectorList';
import DirectorForm from './DirectorForm';
import DirectorCard from './DirectorCard';

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

    return (
        <>
            <NavBar />
            <main>
                <Routes>
                    <Route index element={<DirectorList directors={directors} />} />
                    <Route path="new" element={<DirectorForm addDirector={addDirector} />} />
                    <Route path=":id/*" element={<DirectorCard directors={directors} setDirectors={setDirectors} />} />
                </Routes>
            </main>
        </>
    );
}

export default DirectorContainer;
