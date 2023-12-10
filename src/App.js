import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Game from './pages/Game';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <div className="App">
    <NavBar/>
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/game" element={<Game />}/>
        <Route path="/leaderboard" element={<Leaderboard />}/>
      </Routes>
    </div>
    </div>
  );
}

export default App;
