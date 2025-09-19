import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Intro from "./pages/Intro";
import Roadmap from "./components/Roadmap";
import Level1 from "./pages/Level1";
import Level2 from "./pages/Level2";
import { Level3 } from "./pages/Level3";
import Level4 from "./pages/Level4";
import Level5 from "./pages/Level5";
import Level6 from "./pages/Level6";
import Quiz1 from "./pages/Quiz1";
import Quiz2 from "./pages/Quiz2";
import Final from "./pages/Final";

function App() {
  const [progress, setProgress] = useState({
    quiz1: false,
    quiz1Score: 0,
    level1: false,
    level2: false,
    level3: false,
    level4: false,
    level5: false,
    level6: false,
    quiz2: false,
    quiz2Score: 0,
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route
          path="/quiz1"
          element={<Quiz1 progress={progress} setProgress={setProgress} />}
        />
        <Route
          path="/roadmap"
          element={<Roadmap progress={progress} />}
        />
        <Route
          path="/level1"
          element={<Level1 progress={progress} setProgress={setProgress} />}
        />
        <Route
          path="/level2"
          element={<Level2 progress={progress} setProgress={setProgress} />}
        />
        <Route
          path="/level3"
          element={<Level3 progress={progress} setProgress={setProgress} />}
        />
        <Route
          path="/level4"
          element={<Level4 progress={progress} setProgress={setProgress} />}
        />
        <Route
          path="/level5"
          element={<Level5 progress={progress} setProgress={setProgress} />}
        />
        <Route
          path="/level6"
          element={<Level6 progress={progress} setProgress={setProgress} />}
        />
        <Route
          path="/quiz2"
          element={<Quiz2 progress={progress} setProgress={setProgress} />}
        />
        <Route
        path ="/final"
        element = {<Final progress={progress} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
