import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import ErrorPage from "./pages/ErrorPage"
import DirectorContainer from "./pages/DirectorContainer"

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/directors/*" element={<DirectorContainer />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default App
