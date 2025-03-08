import { useContext } from "react";
import Home from "./pages/Home"
import SearchResults from "./pages/Search"; 
// import Test from "./pages/Test";
// import Timothy from "./pages/Timothy";
import { Routes, Route, Link } from 'react-router-dom';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} /> {/* Search results page */}
      </Routes>
    </div>
  )
}

export default App
