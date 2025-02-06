import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Profile from './pages/Profile';
import Article from './pages/Article';
import PostArticle from './pages/PostArticle';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/post-article" element={<PostArticle />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;