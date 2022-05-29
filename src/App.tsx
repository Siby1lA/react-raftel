import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./Routes/Home";
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
      </Routes>
      <Nav />
    </Router>
  );
}

export default App;
