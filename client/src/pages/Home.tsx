import React from 'react';
import ArticleCard from '../components/ArticleCard';

const Home: React.FC = () => {
  const articles = [
    {
      id: '1',
      title: 'Article 1',
      content: 'Voici le contenu de l\'article 1.',
      author: 'Auteur 1',
      likes: 10,
    },
    {
      id: '2',
      title: 'Article 2',
      content: 'Voici le contenu de l\'article 2.',
      author: 'Auteur 2',
      likes: 5,
    },
  ];

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Liste des articles</h1>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default Home;