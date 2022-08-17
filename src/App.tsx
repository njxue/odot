import "./App.css";
import { Routes, Route, Router } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default App;
