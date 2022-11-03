import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from './components/LoginForm';


function App() {
  return (
  
  <BrowserRouter>
    <Routes>
      <Route element={<LoginForm />} path="/" />
      <Route element={<LoginForm />} path="/login" />
    </Routes >
    </BrowserRouter>

  );
}

export default App;
