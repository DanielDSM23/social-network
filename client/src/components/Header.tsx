import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className="navbar">
        <div>
            <Link to="/" className="mr-4">Accueil</Link>
            {isLoggedIn && <Link to="/profile" className="mr-4">Mon profil</Link>}
        </div>
        <div>
            {!isLoggedIn ? (
            <>
                <Link to="/login" className="btn btn-primary mr-4">Connexion</Link>
                <Link to="/register" className="btn btn-primary">Inscription</Link>
            </>
            ) : (
            <button onClick={handleLogout} className="btn btn-danger">
                Déconnexion
            </button>
            )}
        </div>
    </nav>
  );
};

export default Header;