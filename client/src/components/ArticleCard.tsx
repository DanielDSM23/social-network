import React from 'react';

type Article = {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
};

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="card">
      <h2 className="text-xl font-bold">{article.title}</h2>
      <p>{article.content.slice(0, 100)}...</p>
      <p className="text-gray-600">Auteur : {article.author}</p>
      <p className="text-gray-600">Likes : {article.likes}</p>
    </div>
  );
};

export default ArticleCard;