import "./App.css";
import Login from "./Components/Login";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Registration from "./Components/Registration";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
