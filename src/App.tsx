import { HashRouter as Router , Routes, Route } from 'react-router-dom';
//pages
import Home from "./pages/Home.tsx"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App
