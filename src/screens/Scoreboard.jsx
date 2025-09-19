import { Link } from 'react-router-dom';

const Scoreboard = () => {
  return (
    <div className="scoreboard">
      <h2>Welcome to Scoreboard!</h2>
        <p>Check your scores and progress in the challenges.</p>
      <Link to="/challenge/1">Start Challenges</Link>
      <br />
      <Link to="/simulation/vision">Try Simulation</Link>
    </div>
  );
};

export default Scoreboard;
