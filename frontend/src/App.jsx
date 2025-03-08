import { useContext } from "react";
import Home from "./pages/Home"
import Test from "./pages/Test";
// import Timothy from "./pages/Timothy";
import { Routes, Route, Link } from 'react-router-dom';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
