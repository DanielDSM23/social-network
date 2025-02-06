import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_TWEET = gql`
  mutation CreateTweet($content: String!) {
    createTweet(content: $content) {
      response {
        code
        message
        success
      }
      tweet {
        id
        content
        userId
      }
    }
  }
`;

const GET_TWEETS = gql`
  query GetAllTweets {
    getAllTweets {
      id
      content
      userId
    }
  }
`;

const PostArticle: React.FC = () => {
  const [content, setContent] = useState('');
  const [createTweet, { loading, error }] = useMutation(CREATE_TWEET, {
    refetchQueries: [{ query: GET_TWEETS }], // Met à jour la liste des tweets
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTweet({ variables: { content } });
      setContent('');
      alert('Article créé avec succès');
    } catch (err) {
      console.error('Erreur lors de la création de l\'article :', err);
      alert('Une erreur est survenue.');
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Rédiger un article</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Envoi en cours...' : 'Poster l\'article'}
        </button>
        {error && <p className="text-red-500">Erreur : {error.message}</p>}
      </form>
    </div>
  );
};

export default PostArticle;
