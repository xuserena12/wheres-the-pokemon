import { Link } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>          
          <li>
            <Link to="/game">Game</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default NavBar;