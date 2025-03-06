import Home from "./pages/Home"
import { Routes, Route, Link } from 'react-router-dom';
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </div>
  )
}

export default App
