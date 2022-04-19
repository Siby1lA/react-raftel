import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Routes/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="animes/:id" element={<Home />} />
          <Route path="animes?q=:id" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
