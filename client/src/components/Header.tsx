import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_USER_BY_ID_HEADER = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
    }
  }
`;

const Header: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('token'); 

  const { data } = useQuery(GET_USER_BY_ID_HEADER, {
    skip: !isLoggedIn, 
  });

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
              {data && data.getUserById && (
                <Link to={`/profile/${data.getUserById.id}`} className="navbar-link">Profil</Link>
              )}
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
