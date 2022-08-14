import HomePage from "./pages/HomePage";
import './index.css'
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home/*' element={<div className="App"><HomePage /></div>} />
      </Routes>
    </>

  );
}

export default App;
