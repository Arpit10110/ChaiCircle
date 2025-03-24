import { HashRouter as Router , Routes, Route } from 'react-router-dom';
//pages
import Home from "./pages/Home.tsx"
import Login from "./pages/Login.tsx"
import Signup from "./pages/Signup.tsx"
import AddFriend from './pages/AddFriend.tsx';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/addfriends" element={<AddFriend/>} />
      </Routes>
    </Router>
  )
}

export default App
