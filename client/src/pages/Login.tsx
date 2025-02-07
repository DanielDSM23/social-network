import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      code
      success
      message
      token
    }
  }
`;

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({
        variables: formData,
      });
      const token = result.data.signIn.token; 
      if (token) {
        localStorage.setItem('token', token); 
        navigate('/'); 
        window.location.reload(); 
      }
    } catch (err) {
      console.error('Erreur lors de la connexion :', err);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
        {error && <p className="text-red-500">Erreur : {error.message}</p>}
      </form>
    </div>
  );
};

export default Login;
