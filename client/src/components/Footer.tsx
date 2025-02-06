import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <p>© 2025 Mon Réseau Social. Tous droits réservés.</p>
      <p>
        <a href="/terms" className="text-blue-400">Conditions d'utilisation</a> | 
        <a href="/privacy" className="text-blue-400"> Politique de confidentialité</a>
      </p>
    </footer>
  );
};

export default Footer;