import React from 'react';

const Profile: React.FC = () => {
  const user = {
    name: 'Utilisateur Test',
    email: 'test@example.com',
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mon Profil</h1>
      <p><strong>Nom :</strong> {user.name}</p>
      <p><strong>Email :</strong> {user.email}</p>
    </div>
  );
};

export default Profile;