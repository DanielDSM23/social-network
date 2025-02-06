import React, { useState } from 'react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      alert('Veuillez entrer un email valide.');
      return;
    }
    if (password.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    alert(`Nom : ${name}, Email : ${email}, Password : ${password}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inscription</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Register;