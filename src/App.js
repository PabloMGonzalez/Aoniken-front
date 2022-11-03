import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PostForm from './components/PostForm.js';
import Home from './components/Home';



function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path="/" />
        <Route element={<PostForm />} path="/posts" />
        <Route element={<LoginForm />} path="/login" />
        <Route element={<RegisterForm />} path="/register" />
      </Routes >
    </BrowserRouter>

  );
}

export default App;
