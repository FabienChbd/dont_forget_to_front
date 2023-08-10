import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.tsx";
import Login from "./components/Login.tsx";
import PostIt from "./components/PostIt.tsx";
import "./App.css";

function App() {
  return (
    <Router>
      <header>
        <Header />
      </header>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/postIt" element={<PostIt />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
