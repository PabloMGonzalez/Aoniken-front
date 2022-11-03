import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'


function App() {
  return (
  
  <BrowserRouter>
    <Routes>
      <Route element={<LoginForm />} path="/" />
      <Route element={<LoginForm />} path="/login" />
      <Route element={<RegisterForm />} path="/register" />

    </Routes >
    </BrowserRouter>

  );
}

export default  App;
