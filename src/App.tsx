import { HashRouter as Router , Routes, Route } from 'react-router-dom';
//pages
import Home from "./pages/Home.tsx"
import Login from "./pages/Login.tsx"
import Signup from "./pages/Signup.tsx"
import AddFriend from './pages/AddFriend.tsx';
import Profile from './pages/Profile.tsx';
import CreatePost from './pages/CreatePost.tsx';
import Explore from './pages/Explore.tsx';
import Message from './pages/Message.tsx';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/addfriends" element={<AddFriend/>} />
        <Route path="/:id" element={<Profile/>} />
        <Route path='/createpost/:id' element={<CreatePost/>}  />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/message" element={<Message/>} />
      </Routes>
    </Router>
  )
}

export default App
