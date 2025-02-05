import React from 'react';

const Article: React.FC = () => {
  const article = {
    id: '1',
    title: 'Article 1',
    content: 'Voici le contenu détaillé de l\'article.',
    author: 'Auteur 1',
    likes: 15,
    comments: [
      { id: '1', content: 'Super article !', author: 'Commentateur 1' },
      { id: '2', content: 'Merci pour ce partage.', author: 'Commentateur 2' },
    ],
  };

  const handleLike = () => {
    alert('Vous avez liké cet article.');
  };

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Votre commentaire a été ajouté.');
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <p className="text-gray-600">Par {article.author}</p>
      <p className="mt-4">{article.content}</p>
      <div className="mt-4">
        <button onClick={handleLike} className="bg-blue-500 text-white px-4 py-2 rounded">
          Like ({article.likes})
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Commentaires</h2>
        <ul>
          {article.comments.map((comment) => (
            <li key={comment.id} className="border-b py-2">
              <p>{comment.content}</p>
              <p className="text-gray-500">Par {comment.author}</p>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleAddComment} className="mt-4">
        <textarea
          placeholder="Ajoutez un commentaire..."
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
          Ajouter un commentaire
        </button>
      </form>
    </div>
  );
};

export default Article;