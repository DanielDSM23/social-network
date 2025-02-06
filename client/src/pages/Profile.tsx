import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_CURRENT_USER = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      id
      username
      email
      bio
      createdAt
    }
  }
`;

const Profile: React.FC = () => {
  const userId = localStorage.getItem('userId'); 

  console.log("User ID récupéré :", userId);

  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: { id: userId },
    skip: !userId, 
  });

  console.log("Données de la query :", data);
  console.log("Erreur de la query :", error);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  if (!data || !data.getUserById) {
    return <p>Utilisateur non trouvé.</p>;
  }

  const user = data.getUserById;

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Profil de {user.username}</h1>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Bio :</strong> {user.bio}</p>
      <p><strong>Membre depuis :</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default Profile;
