import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return <div>
    <h1>Home</h1>
    <nav>
        <ul>
          <li>
            <Link to="/activeNotes">Active Notes</Link>
          </li>
          <li>
            <Link to="/archiveNotes">Archive Notes</Link>
          </li>
        </ul>
      </nav>
      </div>;
}

export default Home;