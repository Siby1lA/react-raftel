import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./Routes/Home";
import Join from "./Routes/Join";
import Login from "./Routes/Login";
import Plan from "./Routes/Plan";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="animes/:id/:title" element={<Home />} />
          <Route path="animes?q=:id" element={<Home />} />
        </Route>
        <Route path="/plan" element={<Plan />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/join" element={<Join />}></Route>
      </Routes>
      <Nav />
    </Router>
  );
}

export default App;
