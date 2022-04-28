import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./Routes/Home";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="animes/:id" element={<Home />} />
          <Route path="animes?q=:id" element={<Home />} />
        </Route>
      </Routes>
      <Nav />
    </Router>
  );
}

export default App;
