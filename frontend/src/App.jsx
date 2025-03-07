import Home from "./pages/Home"
import Test from "./pages/Test";
import { Routes, Route, Link } from 'react-router-dom';
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element = {<Test/>} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </div>
  )
}

export default App
