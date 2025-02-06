import React, { useState } from 'react';

const PostArticle: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert(`Article soumis :\nTitre : ${title}\nContenu : ${content}`);
    
    setTitle('');
    setContent('');
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Rédiger un article</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label htmlFor="title" className="block font-bold mb-2">Titre</label>
          <input
            id="title"
            type="text"
            placeholder="Titre de l'article"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="content" className="block font-bold mb-2">Contenu</label>
          <textarea
            id="content"
            placeholder="Contenu de l'article"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full border p-2 rounded"
            rows={6}
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Poster l'article
        </button>
      </form>
    </div>
  );
};

export default PostArticle;
