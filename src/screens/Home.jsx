import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to AccessPlay!</h1>
      <p>Learn web accessibility through interactive challenges.</p>

      <Link to="/challenge/1">Start Challenges</Link>
      <br />
      <Link to="/simulation/vision">Try Simulation</Link>
    </div>
  );
};

export default Home;
