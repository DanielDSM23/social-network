import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!, $bio: String!) {
    createUser(username: $username, email: $email, password: $password, bio: $bio) {
      response {
        code
        success
        message
      }
      user {
        id
        username
        email
        bio
        createdAt
      }
    }
  }
`;

const Register: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', bio: '' });
  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await register({
        variables: formData,
      });
      console.log('Utilisateur créé :', result.data.createUser.user);
    } catch (err) {
      console.error('Erreur lors de l’inscription :', err);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Inscription</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <textarea
          placeholder="Bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Inscription en cours...' : 'S’inscrire'}
        </button>
        {error && <p className="text-red-500">Erreur : {error.message}</p>}
        {data && data.createUser.response.success && <p>Inscription réussie !</p>}
      </form>
    </div>
  );
};

export default Register;
