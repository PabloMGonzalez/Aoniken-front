import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PostForm from './components/PostForm.js';
import Home from './components/Home';
import ListPosts from './components/ListPosts';
// import EditForm from './components/EditForm';
import ListEditable from './components/ListEditable';



function App() {
  return (

    <BrowserRouter>
      <Routes>

        {/* USER */}
        <Route element={<LoginForm />} path="/login" />
        <Route element={<RegisterForm />} path="/register" />


        {/* POST */}
        <Route element={<Home />} path="/" />
        <Route element={<Home />} path="/home" />
        <Route element={<PostForm />} path="/create_post" />
        <Route element={<ListPosts />} path="listar_posts" />
        <Route element={<ListEditable />} path="listar_posts_editables" />



      </Routes >
    </BrowserRouter>

  );
}

export default App;
