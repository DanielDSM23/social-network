import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.reload(); 
  };

  return (
    <header className="navbar">
      <nav className="navbar-content">
        <div className="navbar-left">
          <Link to="/" className="navbar-link">Accueil</Link>
          {isLoggedIn && (
            <>
              <Link to="/post-article" className="navbar-link">Poster un article</Link>
              <Link to="/profile" className="navbar-link">Profil</Link>
            </>
          )}
        </div>
        <div className="navbar-right">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn btn-primary">Connexion</Link>
              <Link to="/register" className="btn btn-primary">Inscription</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
